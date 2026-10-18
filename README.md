# 💍 Royal Shahi Lifafa Wedding Invitation Website
### *Mayank & Muskan | 20 November 2026*

A bespoke, royal Indian wedding digital invitation website featuring an interactive **Shahi Lifafa (Royal Gold & Crimson Royal Envelope)** opening animation, traditional mangal shehnai background music, authentic event galleries, interactive map directions to Krati Resort, and an interactive scratch card.

---

## 🌟 Live Demo & Invitation Pages
- **Groom invitation**: [https://invitation-two-lac.vercel.app/groom](https://invitation-two-lac.vercel.app/groom)
- **Bride invitation**: [https://invitation-two-lac.vercel.app/bride](https://invitation-two-lac.vercel.app/bride)
- **Other guests**: [https://invitation-two-lac.vercel.app/other](https://invitation-two-lac.vercel.app/other)
- **GitHub Repository**: [https://github.com/AvinashSingh9161/invitation](https://github.com/AvinashSingh9161/invitation)

---

## 📜 Key Features

1. **💌 Shahi Lifafa (Royal Wax Seal Envelope)**:
   - Authentic 3D wax seal flap opening with realistic gold-embossed trim.
   - Smooth, fluid sliding transition of the royal invitation card.
   - Background mangal music (Shehnai) autoplay trigger upon opening.

2. **🕉️ Traditional & Cultural Touch**:
   - Lord Ganesha shlokas & auspicious blessings (*वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ*).
   - "Together with their families" royal typography honoring both families.

3. **🗓️ Invitations by guest group**:
   - **Bride**: Haldi (18 Nov 2026, 12:00 PM), followed by Mehendi (5:00 PM) and After Party (7:00 PM) together on one invitation entry at Lodheswar Marriage Lawn, Lucknow; plus Wedding Carnival, Ghurchadi, and Departure of Baraat on 20 Nov at Krati Resort, Bareilly.
   - **Groom**: Full itinerary for 19–20 November 2026.
   - **Other guests**: Wedding Carnival (20 Nov, 12:00 PM), Ghurchadi (5:00 PM), and Departure of Baraat (7:00 PM).

4. **📍 Interactive Venue & Maps**:
   - Venues: **Lodheswar Marriage Lawn, Lucknow** and **Krati Resort, Bareilly**
   - Direct Google Maps navigation links for all celebrations.

5. **✨ Interactive Scratch Card & RSVP**:
   - Scratch card revealing auspicious blessings on 20 November 2026.
   - Quick one-tap calendar addition (`.ics` / Google Calendar).

---

## 🛠️ Tech Stack
- **HTML5 & CSS3**: Custom responsive styling with glassmorphism, royal gold gradients, and micro-animations.
- **Vanilla JavaScript**: Pure JS for scratch canvas interaction, music playback controls, and smooth envelope transitions.
- **Deployment**: Vercel.

## 📊 Google Sheets RSVP Setup

The RSVP receiver is in [`Code.gs`](./Code.gs). It sends groom and other-guest
responses to separate tabs in the shared spreadsheet, and bride responses to
the second spreadsheet. Each tab has name, phone, attendance, party
size, one Yes/No column per event on that page, and a `Created at` timestamp as
the final column. Page is used internally to route responses and is not stored;
couple, song request, dietary requirements, and advice are not saved. Missing
tabs are created automatically. On the first new RSVP after updating the script,
existing RSVP rows are migrated to the new columns, retaining names, phone
numbers, attendance, party size, event selections, and timestamps:

- Shared spreadsheet: `Index RSVP` (groom) and `Pre-Wedding RSVP` (other guests)
- Wedding spreadsheet: `Wedding RSVP` (bride)

To enable submissions the first time:

1. Open [Google Apps Script](https://script.google.com/) and create a project.
2. Replace the starter code with the contents of `Code.gs`, then save.
3. Select **Deploy → New deployment → Web app**. Set **Execute as** to **Me**
   and **Who has access** to **Anyone**, then deploy and authorize access to both
   spreadsheets.
4. Copy the web app URL ending in `/exec` into `rsvpEndpoint` in
   `groom.html`, `other.html`, and `bride.html`.

When updating an existing deployment, use **Deploy → Manage deployments**,
edit the current web app deployment, select **New version**, and deploy. This
updates the code behind its existing URL; creating a separate deployment
instead gives you a different URL. Open the `/exec` URL in a browser after
deploying: the current receiver returns JSON with `"schemaVersion":2` and the
new column names. If it does not, the new script version is not active at that
URL. Existing rows are migrated the next time a response is submitted to that
tab; older rows are not changed just by deploying.

The endpoint is public so invitees can submit without signing in. The script
only routes the three known page names to the configured spreadsheets. Since
Apps Script does not expose a readable cross-origin response to these static
pages, the page can detect a network failure but cannot confirm a server-side
write; check the Apps Script execution log if a response appears successful
but is missing from its tab.

---

## 👨‍💻 Crafted By

**Avinash Singh**
- **Instagram**: [@avi_musician](https://www.instagram.com/avi_musician/)
- **WhatsApp**: [+91 9161985707](https://wa.me/919161985707?text=Hello%20Avinash,%20I%20saw%20your%20wedding%20invitation%20website%20and%20would%20like%20to%20create%20one!)

---

## 📄 License
This project is open-source and available for viewing and inspiration.
