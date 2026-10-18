const RSVP_DESTINATIONS = {
  "groom": {
    spreadsheetId: "1Lt7Hi5m8hioStVRaQTsYdYNCnAliMyYdhlMHcceek8M",
    sheetName: "groom",
    legacySheetNames: ["Index RSVP"]
  },
  "other": {
    spreadsheetId: "1Lt7Hi5m8hioStVRaQTsYdYNCnAliMyYdhlMHcceek8M",
    sheetName: "other",
    legacySheetNames: ["Pre-Wedding RSVP"]
  },
  "bride": {
    spreadsheetId: "1TVw1UplGe006IY6SYdBmQAmfYEbJC-6d_FZnZEs-5tM",
    sheetName: "bride",
    legacySheetNames: ["Wedding RSVP"]
  }
};

const RSVP_EVENTS = {
  "groom": [
    { key: "haldi", labels: ["Masti ki हल्दी"] },
    { key: "sangeet", labels: ["Sangeet Night"] },
    { key: "carnival", labels: ["Wedding Carnival"] },
    { key: "ghurchadi", labels: ["Ghurchadi"] },
    {
      key: "wedding",
      labels: ["Departure of Baraat & Shubh Vivah", "Departure of Baraat & Royal Wedding"]
    }
  ],
  "other": [
    { key: "carnival", labels: ["Wedding Carnival"] },
    { key: "ghurchadi", labels: ["Ghurchadi"] },
    { key: "baraat", labels: ["Departure of Baraat", "Departure of Baraat & Shubh Vivah"] }
  ],
  "bride": [
    { key: "haldi", labels: ["Haldi", "Masti ki हल्दी"] },
    { key: "mehendi", labels: ["Mehendi"] },
    { key: "afterparty", labels: ["After Party"] },
    { key: "carnival", labels: ["Wedding Carnival"] },
    { key: "ghurchadi", labels: ["Ghurchadi"] },
    { key: "baraat", labels: ["Departure of Baraat", "Departure of Baraat & Shubh Vivah"] }
  ]
};

const RSVP_SCHEMA_VERSION = 3;

function doGet() {
  return jsonResponse({
    ok: true,
    schemaVersion: RSVP_SCHEMA_VERSION,
    columns: ["Name", "Phone", "Attending", "Party size"]
      .concat(RSVP_EVENTS.groom.map(function (event) { return event.key; }), ["Created at"])
  });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("Missing RSVP submission.");
    }

    const submission = JSON.parse(e.postData.contents);
    const destination = RSVP_DESTINATIONS[submission.page];
    if (!destination) throw new Error("Unrecognized RSVP page.");

    const rsvp = validateRsvp(submission);
    lock.waitLock(10000);
    const spreadsheet = SpreadsheetApp.openById(destination.spreadsheetId);
    const sheet = getRsvpSheet(spreadsheet, destination);
    ensureSheetLayout(sheet, submission.page);

    sheet.appendRow([
      safeCell(rsvp.name, 120),
      safeCell(rsvp.phone, 40),
      rsvp.attending === "yes" ? "Yes" : "No",
      rsvp.attending === "yes" ? safeCell(rsvp.party, 10) : ""
    ].concat(
      RSVP_EVENTS[submission.page].map(function (event) {
        return rsvp.attending === "yes" && rsvp.events.indexOf(event.key) !== -1 ? "Yes" : "No";
      }),
      [new Date()]
    ));

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error(error && error.stack ? error.stack : error);
    return jsonResponse({ ok: false, error: "RSVP could not be saved." });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function getRsvpSheet(spreadsheet, destination) {
  let sheet = spreadsheet.getSheetByName(destination.sheetName);
  if (sheet) return sheet;

  for (let i = 0; i < destination.legacySheetNames.length; i++) {
    sheet = spreadsheet.getSheetByName(destination.legacySheetNames[i]);
    if (sheet) {
      sheet.setName(destination.sheetName);
      return sheet;
    }
  }

  return spreadsheet.insertSheet(destination.sheetName);
}

function validateRsvp(submission) {
  const rsvp = submission.rsvp || submission;
  const attending = rsvp.attending;
  if (typeof rsvp.name !== "string" || !rsvp.name.trim() || rsvp.name.length > 120) {
    throw new Error("Name is required and must be at most 120 characters.");
  }
  if (typeof rsvp.phone !== "string" || rsvp.phone.length > 40) {
    throw new Error("Phone number must be at most 40 characters.");
  }
  if (attending !== "yes" && attending !== "no") {
    throw new Error("Attendance choice is invalid.");
  }
  if (attending === "yes" && (!Array.isArray(rsvp.events) || rsvp.events.length > 20)) {
    throw new Error("Event selection is invalid.");
  }
  if (attending === "yes" && rsvp.events.some(function (event) {
    return !getRsvpEventKey(submission.page, event);
  })) {
    throw new Error("Event selection contains an unknown event.");
  }

  return {
    name: rsvp.name.trim(),
    phone: rsvp.phone.trim(),
    attending: attending,
    party: attending === "yes" ? String(rsvp.party || "") : "",
    events: attending === "yes"
      ? rsvp.events.map(function (event) { return getRsvpEventKey(submission.page, event); })
      : []
  };
}

function getRsvpEventKey(page, value) {
  const event = RSVP_EVENTS[page].find(function (candidate) {
    return candidate.key === value || candidate.labels.indexOf(value) !== -1;
  });
  return event ? event.key : "";
}

function ensureSheetLayout(sheet, page) {
  const headers = ["Name", "Phone", "Attending", "Party size"]
    .concat(RSVP_EVENTS[page].map(function (event) { return event.key; }), ["Created at"]);
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();

  if (lastRow === 0) {
    sheet.appendRow(headers);
    return;
  }

  const currentHeaders = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  if (headersMatch(currentHeaders, headers)) {
    normalizeEventColumns(sheet, page, lastRow);
    return;
  }

  const rows = lastRow > 1
    ? sheet.getRange(2, 1, lastRow - 1, lastColumn).getValues()
    : [];
  const migratedRows = rows.map(function (row) {
    const oldValue = function (header) {
      const index = currentHeaders.indexOf(header);
      return index === -1 ? "" : row[index];
    };
    const attending = String(oldValue("Attending")).toLowerCase() === "yes" ? "Yes" : "No";
    const oldEvents = String(oldValue("Events")).split(/\s*,\s*/);
    const eventAnswers = RSVP_EVENTS[page].map(function (event) {
      const legacyHeaders = [event.key].concat(event.labels);
      const eventAnswer = legacyHeaders.reduce(function (answer, header) {
        const eventColumn = currentHeaders.indexOf(header);
        return eventColumn === -1 ? answer : String(row[eventColumn]).toLowerCase() || answer;
      }, "");
      return attending === "Yes" &&
        (eventAnswer === "yes" ||
          (eventAnswer !== "no" && legacyHeaders.some(function (header) {
            return oldEvents.indexOf(header) !== -1;
          })))
        ? "Yes"
        : "No";
    });

    return [
      oldValue("Name"),
      oldValue("Phone"),
      attending,
      attending === "Yes" ? oldValue("Party size") : "",
      ...eventAnswers,
      oldValue("Created at") || oldValue("Submitted at")
    ];
  });

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  if (migratedRows.length) {
    sheet.getRange(2, 1, migratedRows.length, headers.length).setValues(migratedRows);
  }
  if (lastColumn > headers.length) {
    sheet.getRange(1, headers.length + 1, lastRow, lastColumn - headers.length).clearContent();
  }
}

function normalizeEventColumns(sheet, page, lastRow) {
  if (lastRow < 2) return;
  const eventColumnStart = 5;
  const eventCount = RSVP_EVENTS[page].length;
  const eventRange = sheet.getRange(2, eventColumnStart, lastRow - 1, eventCount);
  const eventValues = eventRange.getValues().map(function (row) {
    return row.map(function (value) {
      if (value === true || String(value).toLowerCase() === "yes") return "Yes";
      if (value === false || String(value).toLowerCase() === "no" || value === "") return "No";
      throw new Error("Unexpected value in RSVP event column: " + value);
    });
  });
  eventRange.setValues(eventValues);
}

function headersMatch(current, expected) {
  return current.length === expected.length && expected.every(function (header, index) {
    return current[index] === header;
  });
}

function safeCell(value, maxLength) {
  const text = String(value || "").trim().slice(0, maxLength);
  return /^[\s]*[=+\-@]/.test(text) ? "'" + text : text;
}

function jsonResponse(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
