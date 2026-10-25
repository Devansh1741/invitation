# 🌸 Wedding Invitation Website — Architecture & Data Blueprint
**Couple:** Mayank & Muskan  
**Dates:** 19th – 20th November 2026  
**Destination:** Bareilly, Uttar Pradesh, India  
**Reference Analysis:** `https://meenal-avinash-invitation1.vercel.app/?_vercel_share=JNjLhaM1bd48HhgbpVIUAHygOm5KXCaR`

---

## 1. Executive Summary & Aesthetic Direction

This blueprint deconstructs the reference luxury wedding invitation web application and maps 100% of the provided image itinerary and Haldi ceremony artwork for **Mayank & Muskan**.

### The Aesthetic Vision: "Royal Heritage meets Playful Festive"
- **Haldi Inspiration (from Image 2):** Vibrant Marigold yellow (`#FFBA08`), sunny turmeric (`#F48C06`), radiant hot pink (`#E63946` / `#E01E5A`), banana leaf verdant greens (`#2D6A4F`), and earthen terracotta.
- **Evening Glamour (Sangeet & Wedding):** Deep royal maroon/wine (`#6B1D2F`), antique gold foil (`#D4AF37`), midnight indigo (`#1A2238`), and warm pearl ivory (`#FFFDF9`).
- **Typography:**
  - *Headings & Initials:* `Prata` & `Cormorant Garamond` (Regal, editorial serif).
  - *Deity Shloka & Event Accents:* `Noto Serif Devanagari` & `Rozha One` / `Tangerine` / `Italianno` (for handwritten romance & traditional blessings).
  - *Body & Micro-labels:* `Tenor Sans` & `Lora` (Ultra-crisp legibility on mobile screens).

---

## 2. In-Depth Reference Website Feature & Animation Reverse Engineering

| Feature / Animation | Technical Implementation in Reference Site | Customization for Mayank & Muskan |
| :--- | :--- | :--- |
| **3D Interactive Envelope Reveal** | 3D CSS transforms with dynamic perspective (`perspective: 1200px`), layered wax seal (`#seal`), animated top flap (`rotateX(180deg)`), and gold foil liner pattern. | Personalized monogram **"M & M"** gold wax seal; envelope styled in warm ivory and royal crimson with Haldi marigold accents. |
| **Gold Dust & Sparkle Burst** | Dual HTML5 Canvas (`#sparkle`): emits rotating 4-pointed golden sparkle stars when flap breaks open. | Sparkling golden dust bursting outward as the envelope unseals. |
| **Interactive Card Rise & Zoom** | Staged CSS transition pipeline (`.lift` → `.rise` → `.zoom` → `.gone` with precise millisecond timeouts: 360ms, 700ms, 1280ms, 1820ms, 3380ms). | Card elevates from envelope and smoothly morphs into the main invitation webpage. |
| **Floating Flower Petal Shower** | Continuous `<canvas id="petals">` rendering real-time physics-driven swaying petals (`vy`, `vx`, oscillation angle `a`, angular velocity `va`, random scale and alpha). | Upgraded to a blend of **fragrant pink rose petals, golden marigold petals (`#FDB813`), and gold glitter motes**. |
| **Audio Engine & Autoplay Unblocker** | Solves mobile iOS Safari / Android Chrome autoplay restrictions by hooking the envelope tap (a genuine user gesture) to `audio.play()`. Includes Web Audio API Tanpura oscillator drone generator as zero-latency fallback if no mp3 is present. | Background wedding shehnai / flute romantic sitar track with floating music controller (pulsing wavebars and mute toggle). |
| **Interactive Scratch Cards** | 3 Canvas scratch-offs for **Month (Nov)**, **Day (19-20)**, and **Year (2026)** with real-time pointer tracking (`pointerdown`, `pointermove`), dynamic brush radius, and threshold clear detector (`getImageData` > 45% cleared triggers auto-reveal). | Guests scratch off to reveal the wedding celebration dates. |
| **Celebratory Confetti Explosion** | Canvas particle physics emitter exploding festive multi-color ribbons and gold flakes upon scratching all 3 cards. | Confetti burst triggers the live countdown clock and unlocks the itinerary. |
| **Live Dynamic Countdown Clock** | JavaScript `setInterval` calculating exact Days, Hours, Minutes, Seconds to Baraat / Phere on November 20, 2026. Automatically shifts to "Together Since" post-wedding. | Real-time countdown to **November 20, 2026, 7:00 PM** at The Krati, Bareilly. |
| **Event Timeline & Swatches** | Grid of ceremony cards with custom quotes, date tags, venue directions, and interactive circular color palette swatches. | 5 Complete Ceremonies with full dress codes, venue links, and times extracted from user images. |
| **One-Click RSVP to WhatsApp** | Interactive form capturing guest count, ceremonies attending, dietary preferences, and auto-composing formatted WhatsApp message. | Integrated WhatsApp RSVP dispatch to host's contact number. |

---

## 3. Data Feed Specification (Extracted from Images)

### Couple & Host Meta
```javascript
const CONFIG = {
  couple: {
    groom: "Mayank",
    bride: "Muskan",
    title: "Mayank & Muskan",
    initials: "M & M",
    tagline: "Together with their families, invite you to celebrate their wedding"
  },
  dates: {
    startDate: "19th November 2026",
    endDate: "20th November 2026",
    year: "2026",
    scratchCards: {
      card1: { label: "Month", value: "NOVEMBER" },
      card2: { label: "Dates", value: "19 - 20" },
      card3: { label: "Year", value: "2026" }
    }
  },
  weddingAt: "2026-11-20T19:00:00+05:30", // Baraat Departure & Wedding Evening
  locationCity: "Bareilly, Uttar Pradesh",
  shloka: "॥ श्री गणेशाय नमः ॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥",
  music: {
    autoplayOnOpen: true,
    audioFiles: ["music.mp3", "music/wedding.mp3", "assets/music.mp3"]
  }
};
```

---

## 4. Comprehensive Event Schedule & Itinerary Data

The itinerary incorporates data from **Image 1 (Schedule)** and **Image 2 (Haldi Artwork)**:

### Event 1: Masti ki हल्दी (Haldi Ceremony)
* **Date:** Thursday, 19th November 2026
* **Time:** 12:00 Noon onwards (followed by Lunch)
* **Title:** Masti ki हल्दी
* **Quote:** "Get ready for sunshine, laughter, turmeric smiles, and dhol beats!"
* **Venue:** Hotel Mantra, Akanksha Enclave, Pilibhit Road, Bareilly
* **Google Maps Query:** `Hotel Mantra, Akanksha Enclave, Pilibhit Road, Bareilly`
* **Dress Code (from Image 2):**
  * **Boys:** White Kurta & Blue Denims
  * **Girls:** Traditional Indian Attire in the shades of Hot Pink
* **Color Palette Swatches:**
  * `#FFD000` (Haldi Yellow)
  * `#FF1493` (Hot Pink)
  * `#274472` (Denim Indigo)
  * `#FFFFFF` (Crisp White)
* **Visual Theme:** Earthen turmeric pots, yellow marigold garlands, traditional umbrella canopy, banana leaf accents.

---

### Event 2: Sangeet Night (Dinner & Dance)
* **Date:** Thursday, 19th November 2026
* **Time:** 7:00 P.M. onwards (followed by Dinner)
* **Title:** Sangeet & Musical Night
* **Quote:** "Put on your dancing shoes for an evening of music, rhythm, and celebration!"
* **Venue:** Hotel Jass Grand, Stadium Road, Bareilly
* **Google Maps Query:** `Hotel Jass Grand, Stadium Road, Bareilly`
* **Dress Code:**
  * **Attire:** Glamorous Indo-Western / Cocktail Sparkle
  * **Suggested Shades:** Royal Wine, Midnight Emerald & Shimmering Gold
* **Color Palette Swatches:**
  * `#58111A` (Royal Wine)
  * `#D4AF37` (Metallic Gold)
  * `#0B3C35` (Deep Emerald)
  * `#1B263B` (Midnight Sparkle)

---

### Event 3: Wedding Carnival
* **Date:** Friday, 20th November 2026
* **Time:** 12:00 Noon
* **Title:** The Sunny Carnival
* **Quote:** "A vibrant afternoon of fun games, food stalls, cocktails, and laughter!"
* **Venue:** Bareilly (Hotel Mantra / Festive Grounds)
* **Dress Code:**
  * **Attire:** Breezy Chic / Colorful Daywear & Stylish Sunglasses
  * **Suggested Shades:** Pastel Peach, Mint Green & Soft Lilac
* **Color Palette Swatches:**
  * `#FDB4A6` (Pastel Peach)
  * `#BCE5D0` (Breezy Mint)
  * `#E3D0F7` (Soft Lilac)
  * `#FFF3B0` (Sunshine Vanilla)

---

### Event 4: Ghurchadi (Groom's Auspicious Ritual)
* **Date:** Friday, 20th November 2026
* **Time:** 5:00 P.M.
* **Title:** Ghurchadi Ceremony
* **Quote:** "The auspicious blessing of the groom before mounting the royal steed."
* **Venue:** Bareilly (Residence / Gathering Venue)
* **Dress Code:**
  * **Attire:** Traditional Ethnic / Festive Kurta Pajamas & Sarees
* **Color Palette Swatches:**
  * `#C84B31` (Vermilion / Kumkum)
  * `#D4AF37` (Warm Gold)
  * `#F8F1E5` (Silk Cream)

---

### Event 5: Departure of Baraat & Royal Wedding Reception / Phere
* **Date:** Friday, 20th November 2026
* **Time:** 
  * 7:00 P.M. – Departure of Baraat
  * Followed by Dinner, Varmala & Sacred Phere
* **Title:** Departure of Baraat & Royal Wedding
* **Quote:** "Two souls, two families, united under the stars in eternal love."
* **Venue:** The Krati, Pilibhit Road, Near Airport, Bareilly
* **Google Maps Query:** `The Krati, Pilibhit Road, Near Airport, Bareilly`
* **Dress Code:**
  * **Attire:** Grand Traditional Royal Indian (Sherwanis, Embroidered Lehengas, Safas/Turbans)
  * **Suggested Shades:** Velvet Crimson, Regal Maroon, Pearl Ivory & Pure Zari Gold
* **Color Palette Swatches:**
  * `#800020` (Imperial Crimson)
  * `#D4AF37` (Zari Gold)
  * `#FAF3E0` (Pearl Ivory)
  * `#3E1F47` (Royal Plum)

---

## 5. Website Architecture & Component Hierarchy

```
Invitation pages: celebration.html, invite.html, shubh.html
 ├── Floating Controls
 │    ├── #music (Web Audio API Tanpura Drone / MP3 playback toggle with animated sound bars)
 │    └── #share (Native Web Share API + Clipboard copy toast)
 ├── #envelope (Interactive 3D Envelope Opening Container)
 │    ├── .env-flap (Rotates 180deg on user tap)
 │    ├── .env-seal (Golden wax seal with "M & M" monogram)
 │    ├── <canvas id="sparkle"> (Particle starburst on break)
 │    ├── .env-card (Rises and zooms into viewport)
 │    └── .env-tap ("Tap to Unveil Invitation")
 ├── <canvas id="petals"> (Global falling Marigold & Rose Petals layer)
 └── #page (Main Invitation Experience)
      ├── #hero (Shri Ganesh Shloka, Couple Names, Date Banner, Floral Motif)
      ├── #date (Interactive 3-Card Scratch-to-Reveal: Month, Date, Year)
      │    ├── <canvas id="scratch-1"> (Month: NOVEMBER)
      │    ├── <canvas id="scratch-2"> (Date: 19 - 20)
      │    ├── <canvas id="scratch-3"> (Year: 2026)
      │    └── #dateLock & Confetti Burst
      ├── #countdown (Live countdown timer to 20th Nov 7:00 PM)
      ├── #story ("Forever Us" romantic carousel / memories)
      ├── #events (5 Custom Timeline Cards with Maps & Color Swatches)
      │    ├── Haldi ("Masti ki हल्दी" with White Kurta & Hot Pink swatches)
      │    ├── Sangeet Night
      │    ├── Carnival
      │    ├── Ghurchadi
      │    └── Departure of Baraat & Wedding Dinner
      ├── #rsvp (Interactive RSVP form connected to WhatsApp)
      └── #closing ("With Best Compliments from Family & Friends")
```

---

## 6. Verification and Deployment Readiness
- **Zero Heavy Frameworks:** Pure Vanilla CSS3 + HTML5 + Canvas JS for instantaneous mobile loading.
- **Audio Autoplay Safety:** User interaction on envelope unblocks iOS/Android audio context without friction.
- **High-DPI Canvas Rendering:** Support for Retina screens (`window.devicePixelRatio`) preventing scratch card blurriness.
- **Direct Navigation:** Pre-configured Google Maps search query URLs for each Bareilly venue.
