# Lumora Global Education — website & content studio

- **Website:** one page in English, ChiShona, Türkçe and Français (`/en`, `/sn`, `/tr`, `/fr`).
- **Content studio:** at **`/admin`** (the "Staff login" link in the footer). Staff can:
  - change the hero photo, contact details and social links
  - add partner university logos, team members and student stories, with photos
  - edit services, "Why Türkiye" and "About us" in each language, with a live preview
  - hide or reorder homepage sections
  - follow up on every booking-form request in the **Enquiries** inbox (status, notes, WhatsApp reply, CSV export)
  - manage staff accounts (admins only)

Built with Next.js 16, TypeScript and Tailwind CSS 4. Content is stored in **Sanity** on the live site, or in a local `.data/` folder on your computer.

---

## 1. Run it on your computer

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
cp .env.example .env.local
```

Open `.env.local` and fill in:

- `AUTH_SECRET`: paste the output of `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- `ADMIN_EMAIL` and `ADMIN_PASSWORD`: the first admin account

Then:

```bash
npm run dev
```

- **Website:** http://localhost:3000
- **Content studio:** http://localhost:3000/admin. Sign in with `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

The first sign-in creates the admin account and fills the studio with the website's starting text. After that, add the rest of the team under **Staff accounts**. Each person gets a temporary password, which they can change under **My account**. You can then remove `ADMIN_PASSWORD` from the settings.

On your computer, everything is saved in the `.data/` folder: content, enquiries, accounts and uploaded photos. Don't upload that folder anywhere.

## 2. Storage for the live site (Sanity, free plan)

Most hosts, Vercel included, can't save files, so the live site stores content in Sanity:

1. Create a project at https://www.sanity.io/manage with a dataset called `production`.
2. **Make the dataset private.** It holds enquiries (students' phone numbers) and staff accounts. In the project, go to **Datasets → production → Edit → Visibility: Private**.
3. Under **API → Tokens**, create a token with **Editor** permissions.
4. Set these, both on your host and in `.env.local` if you want your computer to use Sanity too:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=the-token
   ```

Nobody uses Sanity's own interface; staff only ever see `/admin`. Content on your computer (`.data/`) is not copied to Sanity. On the live site, the first admin sign-in fills Sanity with the starting text in the same way.

## 3. Email alerts for new enquiries (optional)

Every booking-form request lands in **Enquiries**. To also get an email:

1. Create a free account at https://resend.com and an API key.
2. Set `RESEND_API_KEY` and `ENQUIRY_NOTIFY_EMAIL` (several addresses can be comma-separated).
3. Once Lumora has a domain, verify it in Resend and set `ENQUIRY_FROM_EMAIL`, e.g. `Lumora Website <hello@lumoraglobal.com>`. Until then, Resend only delivers to the email address you signed up with.

## 4. Put it online (Vercel, free plan)

1. Upload this folder to a Git repository owned by Lumora (or whoever will own the site), or deploy from your computer with `npx vercel`.
2. Import it at https://vercel.com/new.
3. Add the environment variables: `AUTH_SECRET`, `ADMIN_*`, the three `SANITY` values, `NEXT_PUBLIC_SITE_URL` (the live address) and optionally the Resend values.
4. Deploy, then sign in at `https://your-site/admin`.

**Domain:** buy one (e.g. `lumoraglobal.com` or `lumora.co.zw`), add it under Vercel → Project → Settings → Domains, and follow the DNS steps.

---

## Where things live

| What | Where |
|---|---|
| Fixed text: menu, hero, buttons, form labels (4 languages) | `content/dictionary.ts` |
| Starting text for services, Why Türkiye, About | `content/defaults.ts` |
| Default contact details | `content/site.ts` |
| Website page and sections | `app/(site)/[locale]/page.tsx`, `components/` |
| Content studio pages | `app/(admin)/admin/` |
| Content studio screens | `components/admin/` |
| Saving & permissions (server actions) | `lib/admin/actions.ts` |
| Login & sessions | `lib/auth/`, `proxy.ts` |
| Storage (Sanity or local files) | `lib/data/store.ts` |
| Booking form handler | `app/api/enquiry/route.ts` |
| Colours & fonts | `app/globals.css` |

## Security notes

- Passwords are stored as salted scrypt hashes, never in plain text.
- Sessions are signed with `AUTH_SECRET` and last 7 days. Removing a staff account ends their access immediately.
- **Editors** can edit content and handle enquiries. **Admins** can also manage staff accounts and delete enquiries.
- Uploads are limited to JPG, PNG or WebP, up to 4 MB.

## Languages

A native Shona speaker should read the Shona text once: the `sn` text in `content/dictionary.ts` and the Shona tabs in the studio. A quick check of the Turkish and French is worthwhile too.
