# Farha weds Firoj — Royal 3D Animated Wedding Invitation

An Awwwards-caliber, mobile-first, front-end-only 3D animated Islamic wedding invitation website created for the marriage of **Farha Praveen** and **Md. Firoj** (*12 December 2026, Hotel Shree Parivaar, Barhi*).

Designed with a **Royal "Nikah Night"** theme featuring deep emerald (`#0B3D2E` / `#134E3A`), antique gold foil (`#C9A24B`), ivory (`#FBF6E9`), silver filigree (`#B8BDC4`), and maroon accents (`#7A1F2B`).

---

## ✨ Features & Experience Flow

0. **Section 0 — Loader:**
   - FF monogram inside a botanical floral wreath draws itself via SVG stroke animation.
   - Gently swinging brass fanous lantern with an animated warm flame.
   - Accelerated organic percentage counter with gold shimmer.

1. **Section 1 — Intro Gate:**
   - Sealed luxury envelope with a glowing FF gold wax seal.
   - Dynamic recipient greeting: `"To, Mrs./Mr. [Guest Name]"` (from `?to=` URL parameter).
   - "Open Invitation" button triggers haptic vibration, golden volumetric light burst, and petal confetti.
   - Includes "Skip intro" bypass link for immediate card access.

2. **Section 2 — Hero:**
   - Real-time WebGL night-sky 3D scene with crescent moon, shining stars, floating fanous lanterns, and falling petals.
   - Parallax responsive to mouse/pointer and mobile device gyroscope.
   - Couple names **"Farha weds Firoj"** written in calligraphy script (`Great Vibes`).
   - Welcoming faceless 3D characters (groom in sherwani & topi, bride in bridal dupatta) with rotating speech bubbles: *"Assalamu Alaikum"*, *"Welcome"*, *"Aap sabhi ko dil se dawat hai"*, and the guest's name.

3. **Section 3 — Sacred Bismillah & Invitation:**
   - Sacred Bismillah in Arabic calligraphy (`Amiri`) with English translation.
   - Rising architectural Mihrab-arch frame with line-by-line reveal of parents' loving invitation:
     *"Mrs. & Mr. Md. Mahtab - Request the honour of your presence on the auspicious occasion of marriage ceremony of our loving Daughter"*.

4. **Section 4 — Bride & Groom:**
   - 3D interactive tilt cards for **Farha Praveen** (D/o.- Md. Mahtab, Barkatha, Hazaribagh) and **Md. Firoj** (S/o.- Md. Mustaque, Hindpiri, Ranchi).
   - Central glowing "weds" medallion.

5. **Section 5 — Programme (7 Events across 4 Days):**
   - Exact schedule preserved verbatim:
     - **10.12.2026 (Thursday)**: Qurankhani & Milad (at 08:00 a.m.)
     - **10.12.2026 (Thursday)**: Rasm-E-Haldi (Lagan) (at 04:00 p.m.)
     - **11.12.2026 (Friday)**: Rasm-E-Mehndi (at 04:00 p.m.)
     - **12.12.2026 (Saturday)**: Dinner (at 07:00 p.m.)
     - **12.12.2026 (Saturday)**: Arrival of Barat (at 09:00 p.m.)
     - **12.12.2026 (Saturday)**: Nikah (at 10:00 p.m.)
     - **13.12.2026 (Sunday)**: Rukhsati (at 08:00 a.m.)
   - Dynamic 3D lighting transitions per section (Milad dusk, Haldi warm amber, Mehndi henna green, Nikah royal gold, Rukhsati soft dawn).
   - Day filter pills and direct Google Calendar buttons per event.

6. **Section 6 — Live Countdown to Nikah:**
   - Target: **12-Dec-2026 22:00 IST (UTC+05:30)**.
   - 3D luxury flip digit boxes (Days, Hours, Minutes, Seconds).
   - Dynamic status: *"Alhamdulillah, today is the day"* when the event day arrives.

7. **Section 7 — Venue:**
   - **Hotel Shree Parivaar, Barhi**.
   - One-tap "Open in Google Maps" and "Copy Address" with toast notification.

8. **Section 8 — Hosts & R.S.V.P.:**
   - Inviter: **Md. Mahtab Khan** with address and 3 tap-to-call phone numbers (`9122912973`, `7061743077`, `9304732817`).
   - WhatsApp deep-link button (`wa.me`).
   - R.S.V.P. list: Respectful, plain presentation of late elders (**Late Naim Khan**, **Late Aftab Khan**) followed by family members and *"All Relatives & Friends"*.

9. **Section 9 — Save & Share:**
   - Download complete **.ICS calendar** containing all 7 events with alarms.
   - WhatsApp share button with ready-made formatted invitation text.
   - Interactive **QR Code Modal** for in-person phone scanning.
   - Built-in personalizer: type any guest's name to generate a tailored link on the fly.

10. **Section 10 — Footer:**
    - Verbatim closing line: *"With Best Compliments From: Md. Mahtab Khan"*.
    - Sacred Dua: *"Jazakallah Khair for your presence & prayers"* (جَزَاكُمُ اللَّهُ خَيْرًا).
    - Shooting star animation and faceless character farewell wave.

11. **Ambient Audio Toggle:**
    - Floating atmosphere control in the bottom-right corner.
    - **OFF by default** to respect cultural guidelines.
    - Zero external audio files: synthesizes soothing ambient drone harmonics using the native Web Audio API.

---

## 🛠️ Tech Stack & Performance

- **Framework**: Vite + React 19
- **3D Graphics**: Three.js (procedural low-poly luxury geometry, instanced petals & gold dust, zero external 3D model downloads needed)
- **Animation**: GSAP + Lenis Smooth Momentum Scrolling + Canvas Confetti
- **Styling**: Tailwind CSS v4 + Vanilla CSS Design Tokens
- **Icons**: Lucide React
- **Payload**: Entire production bundle is **~290 kB gzipped** (well under the 3 MB threshold), ensuring instant loading on 4G networks and mid-range Android devices.
- **Fallbacks**: Graceful 2D animated fallback when WebGL is unavailable or when `prefers-reduced-motion` is active.

---

## 🚀 How to Run Locally

1. Clone or open the repository folder:
   ```bash
   cd Invitation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. To test with a personalized guest name:
   ```
   http://localhost:5173/?to=Rahim%20Uncle
   http://localhost:5173/?to=Dr.%20Tariq%20Sahab
   ```

---

## ✏️ How to Edit Wedding Details

All wedding text lives in **a single file**:
[`src/data/invitation.js`](file:///d:/Invitation/src/data/invitation.js)

To modify dates, event times, phone numbers, venue details, or RSVP names, simply open `src/data/invitation.js` and edit the corresponding fields. The entire website updates automatically.

---

## 🌐 How to Deploy to Netlify

### Option 1: Drag-and-Drop Deploy (Easiest & Fastest)
1. Build the production files:
   ```bash
   npm run build
   ```
2. Log in to [Netlify](https://app.netlify.com/).
3. Drag and drop the `dist/` folder into the Netlify "Sites" dashboard.
4. Your site is live immediately with HTTPS and Open Graph preview cards enabled!

### Option 2: Connect via Git
1. Push this repository to GitHub or GitLab.
2. In Netlify, click **"Add new site" > "Import an existing project"**.
3. Netlify will automatically detect settings from [`netlify.toml`](file:///d:/Invitation/netlify.toml):
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Click **Deploy Site**.

---

## 📱 WhatsApp Rich Link Preview (Open Graph)

The website includes pre-configured Open Graph meta tags and an image in `public/og-image.jpg`. When sharing the URL on WhatsApp, Telegram, iMessage, Twitter, or Facebook, it will display a high-resolution preview card showing the royal emerald background, antique gold mihrab arch, FF monogram wreath, and "Farha weds Firoj" announcement.
