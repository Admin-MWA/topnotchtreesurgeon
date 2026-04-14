# TNTS Next.js Landing Clone

Pixel-focused Next.js clone of the original Unbounce page:
[https://topnotch-landing.ubpages.com/tnts/](https://topnotch-landing.ubpages.com/tnts/)

## Features

- Single-page landing layout with matching copy and CTA structure.
- Local images under `public/assets/img/` (short filenames; originally mirrored from Unbounce / CloudFront).
- Quote form endpoint at `POST /api/quote`.
- Resend email delivery for quote submissions.
- Basic anti-spam protections (honeypot + in-memory rate limit).

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy env vars:

```bash
cp .env.example .env.local
```

3. Set values in `.env.local`:

- `RESEND_API_KEY`
- `QUOTE_TO_EMAIL`
- `QUOTE_FROM_EMAIL` (optional but recommended, must be a verified sender/domain in Resend)

4. Start dev server:

```bash
npm run dev
```

## Asset notes

- Image files are in `public/assets/img/`.
- See `public/assets/ASSET_MANIFEST.md` for filenames and usage.

## Form Behavior

- Requires Name, Email, Address, Phone, and Description.
- Sends quote details to `QUOTE_TO_EMAIL` via Resend.
- Returns user-friendly success/error status messages in the form UI..
