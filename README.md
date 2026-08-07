# OVERCLOCK'26

Eight arcs. One day. A manga/ink-panel themed landing site for a one-day student tech
symposium — built with React, Vite, and React Router.

No copyrighted character art or licensed manga panels are used anywhere in this project.
Every animation, illustration, and visual effect is original CSS/SVG, built specifically
for this site.

---

## Stack

- **React 19** + **Vite** — build tooling
- **React Router 7** — client-side routing (`/`, `/events/:id`, `/events/:id/register`)
- **Framer Motion** — page/panel transitions
- Vanilla CSS (no Tailwind/UI framework) — the ink/comic-panel look is hand-built with
  `clip-path`, CSS custom properties, and keyframe animations
- **Google Apps Script** — free serverless backend for registrations (writes straight
  into a Google Sheet, no database needed)

---

## Features

- **Ink-wipe intro** — plays once per browser session on first load (`IntroSequence.jsx`)
- **8 themed events**, each with an original "arc name" (Prompt No Jutsu, Forbidden
  Scroll, Pixel Ronin, Bug Hunter's Bounty, Guild Rank-Up, Lost Relic, Silent Jutsu,
  Bond Circuit) instead of generic titles
- **Slash-reveal page transition** (`SlashReveal.jsx`) — two torn panels slide in, meet,
  hold, then slide apart to reveal each event page. Supports custom images per event
  with adjustable crop position/zoom
- **Dynamic registration form** (`RegistrationForm.jsx`) — automatically adapts to each
  event's team-size range (solo / fixed / min–max), showing exactly the right number of
  required and optional teammate fields
- **Wave + ink-splatter intro** on the register page (`WaveIntro.jsx` +
  `InkSplatterReveal.jsx`) — an SVG water-ripple filter plays first, then ink blots
  splatter in and dry into kanji watermarks
- **Google Sheets backend** — every submission is routed into its own auto-created sheet
  tab, named after the event

---

## Project structure

```
src/
├── App.jsx                    # Route definitions
├── main.jsx                   # Entry point, wraps App in BrowserRouter
├── styles.css                 # All styling (single file, organized by section)
├── data/
│   └── events.js              # All 8 events: names, descriptions, team size, images
├── utils/
│   └── teamSize.js            # Parses "2–4" / "1 (solo)" / "2" into { min, max }
├── pages/
│   ├── HomePage.jsx           # Landing page: hero, events grid, countdown
│   ├── EventPage.jsx          # Individual event detail page
│   └── RegisterPage.jsx       # Dedicated registration page per event
└── components/
    ├── Header.jsx / Footer.jsx / Marquee.jsx / Hero.jsx / Countdown.jsx
    ├── EventsGrid.jsx         # The 8-panel event grid on the home page
    ├── IntroSequence.jsx      # First-load site intro
    ├── SlashReveal.jsx        # Event page entrance transition
    ├── WaveIntro.jsx          # SVG water-ripple filter for the register page
    ├── InkSplatterReveal.jsx  # Ink splatter → kanji watermark animation
    ├── RegistrationForm.jsx   # Team-size-aware registration form
    └── ScrollToTop.jsx        # Resets scroll position on every route change
```

---

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build      # production build → dist/
```

---

## Wiring up registrations (Google Sheets)

Registrations are sent to a Google Apps Script Web App, which appends each entry into
its own auto-created sheet tab (named after the event title).

1. Create a new Google Sheet.
2. **Extensions → Apps Script**, replace the default code with:
```js
   function doPost(e) {
     const ss = SpreadsheetApp.getActiveSpreadsheet();
     const data = JSON.parse(e.postData.contents);

     const sheetName = data.eventTitle.replace(/[\[\]\*\?\/\\:]/g, '-');
     let sheet = ss.getSheetByName(sheetName);
     if (!sheet) {
       sheet = ss.insertSheet(sheetName);
       const headers = [
         'Timestamp', 'Event Code', 'Arc', 'Event Title',
         'Name', 'Email', 'Phone', 'College', 'Team', 'Members', 'Team Size Declared'
       ];
       sheet.appendRow(headers);
       sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
     }

     sheet.appendRow([
       data.timestamp, data.eventCode, data.eventArc, data.eventTitle,
       data.name, data.email, data.phone, data.college, data.team,
       data.members, data.teamSizeDeclared
     ]);

     return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
       .setMimeType(ContentService.MimeType.JSON);
   }
```
3. **Deploy → New deployment → Web app.** Execute as **Me**, access **Anyone**. Deploy,
   authorize, copy the resulting URL (ends in `/exec`).
4. Paste it into `src/components/RegistrationForm.jsx`:
```js
   const SHEET_ENDPOINT = 'https://script.google.com/macros/s/XXXXXXX/exec'
```
5. **Any time you edit the Apps Script code later**, you must create a **new deployment
   version** (Deploy → Manage deployments → edit → New version) — saving the script
   alone does not update the live endpoint.

---

## Customizing events

Everything about an event — name, arc name, description, team size, time/venue,
organizers, and slash-reveal images — lives in `src/data/events.js`. Team size accepts
`"1 (solo)"`, `"2"` (fixed), or `"2–4"` (range); the registration form automatically
adjusts its fields based on this string via `parseTeamSize()`.

Per-event slash-reveal images are set via `slashLeft` / `slashRight` (full path
including extension), with optional `slashLeftPosition` / `slashLeftSize` (and `Right`
equivalents) to fix cropping — these map directly to CSS `background-position` /
`background-size`.

---

## Deployment

The project includes a `vercel.json` rewrite rule for client-side routing. To deploy:

1. Push to a GitHub repo.
2. Import the repo on [vercel.com](https://vercel.com) — Vite preset auto-detects.
3. Deploy. No environment variables needed (the Sheets endpoint is a public URL baked
   into the client code, not a secret).

---

## Credits

Built for OVERCLOCK'26, a one-day student tech symposium (August 8, 2026). All doodles,
panel art placeholders, and animations are original — see `src/data/events.js` for
attribution notes if custom event artwork was added by the organizing team.