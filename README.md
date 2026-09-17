# IMPERIOR 2K26 Website

A responsive red/black cyber-tech symposium website for:

**University College of Engineering, Pattukkottai**  
*A Constituent College of Anna University, Chennai*  
**Department of Computer Science and Engineering (AI & ML)**

## Included

- IMPERIOR 2K26 hero section
- 8 event cards (5 Technical + 3 Non-Technical)
- Event-detail popups
- Rules & regulations
- Registration form
- Exactly-3-event validation
- Team maximum 3 members
- ₹150 registration / ₹200 on-spot display
- Coordinator contacts
- Venue and time
- Mobile responsive design
- Secure Google Apps Script to Google Sheets submission support
- Firebase Firestore and LocalStorage fallback for development

## Run locally

Install Node.js, then:

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Enable Google Sheets registration storage

1. Create a Google Sheet while signed in to `imperior2k26@gmail.com`.
2. Open **Extensions > Apps Script**, paste `apps-script/Code.gs`, and save it.
3. Deploy as a Web app, execute as your account, and allow access to anyone who has the link.
4. Keep the deployed Web App URL ending in `/exec` configured in `src/main.jsx`.
5. Redeploy the existing Apps Script version after updating `apps-script/Code.gs`, then rebuild:

```bash
npm run build
```

The website submits registrations only to the existing Apps Script Web App and writes to the `Responses` tab. Because Apps Script Web App responses do not provide browser CORS headers, the site uses a native cross-origin POST form targeting a hidden iframe; the Apps Script result is returned to the page with `postMessage` after the Sheet and Drive writes complete. This avoids `no-cors` and does not treat an unreadable request as successful.

The Apps Script validates the participant count, amount, event count, UPI Transaction ID / UTR, duplicate submissions, and payment screenshot on the server before appending a row. It stores the screenshot in Drive and records payment as **PENDING VERIFICATION**. Organizers must manually compare the UTR and screenshot with the official payment account before changing the status to **VERIFIED** or **REJECTED**. Redeploy the existing Apps Script Web App after updating `apps-script/Code.gs` so the `/exec` URL serves the `payload` form parser and `postMessage` response.

## Add the official payment QR

The exact organizer-provided QR image is stored at `public/qr code.jpeg`. The frontend does not generate or substitute a QR code.

## Deploy

### Vercel
```bash
npm install
npm run build
```
Deploy the project folder through Vercel and use the deployed URL as the poster QR destination.

### Netlify
Build command:
`npm run build`

Publish directory:
`dist`

## Important before publishing

- The official symposium email is `imperior2k26@gmail.com`.
- Replace the Instagram placeholder URL with the official IMPERIOR Instagram profile URL.
- Review every event's final rules, rounds, timing and team-size policy with your organizers.
- Generate the final QR code only after the real website URL is live.
- Confirm the Apps Script Web App deployment has access to the `Responses` sheet and Google Drive before accepting public registrations.

## Current contact details in the site

Faculty Coordinator:
Dr. M. G. Kavitha — 9994703151

Student Coordinators:
Sharbu Nisha — 8807316036
Mubharak — 7904775276
Fathima — 7904596722
Sanjaya — 8870493766
