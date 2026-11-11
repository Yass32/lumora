# Lumora Global Education — website

A one-page website in **English, ChiShona, Türkçe and Français**, with a content studio (CMS) at **`/admin`** where staff:

- change the hero photo, contact details and social links
- add partner university logos, team members and student stories
- edit the services, "Why Türkiye" and "About us" text in every language
- hide or reorder homepage sections
- follow up on every booking-form request in the **Enquiries** inbox

Built with Next.js 16, TypeScript, Tailwind CSS 4 and Sanity.

The site works before the CMS is connected: it shows its built-in text and the Bosphorus illustration. Partner logos, team and student stories appear once they're added in the CMS.

---

## 1. Run it on your computer

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. It redirects to `/en`, `/sn`, `/tr` or `/fr` based on the visitor's browser language.

## 2. Connect the CMS (Sanity, free plan)

1. Create an account and a project at https://www.sanity.io/manage. Choose the **production** dataset.
2. Copy the **Project ID** into `.env.local` as `NEXT_PUBLIC_SANITY_PROJECT_ID`.
3. In the project, go to **API → CORS origins** and add:
   - `http://localhost:3000` (tick **Allow credentials**)
   - your live address later, e.g. `https://lumoraglobal.com` (tick **Allow credentials**)
4. In **API → Tokens**, create a token with **Editor** permissions. Put it in `.env.local` as `SANITY_API_WRITE_TOKEN`. Never share it or put it in front-end code.
5. Fill the CMS with the starting content:
   ```bash
   npm run seed
   ```
6. Open http://localhost:3000/admin and sign in.
7. Invite the Lumora team in sanity.io/manage → **Members**.

Content changes appear on the website within about a minute.

## 3. Email alerts for new enquiries (optional)

Every booking-form request is saved in the CMS under **Enquiries**. To also get an email:

1. Create a free account at https://resend.com and an API key.
2. Set `RESEND_API_KEY` and `ENQUIRY_NOTIFY_EMAIL` (several addresses can be comma-separated).
3. Once Lumora has a domain, verify it in Resend and set `ENQUIRY_FROM_EMAIL`, e.g. `Lumora Website <hello@lumoraglobal.com>`. Until then, the `onboarding@resend.dev` sender only delivers to the email address you signed up to Resend with.

## 4. Put it online (Vercel, free plan)

1. Upload this folder to a Git repository (GitHub, GitLab or Bitbucket) under the account that will own the site, or deploy straight from your computer with `npx vercel`.
2. Import it at https://vercel.com/new.
3. Add the same environment variables as in `.env.local`, with `NEXT_PUBLIC_SITE_URL` set to the live address.
4. Deploy. Add the live address to Sanity's CORS origins (step 2.3).

**Domain:** Lumora doesn't have one yet. Buy one (e.g. `lumoraglobal.com` or `lumora.co.zw`), then add it under Vercel → Project → Settings → Domains and follow the DNS instructions.

---

## Where things live

| What | Where |
|---|---|
| Fixed text: menu, hero, buttons, form labels (all 4 languages) | `content/dictionary.ts` |
| Starting text for services, Why Türkiye, About (used until the CMS has its own) | `content/defaults.ts` |
| Default contact details | `content/site.ts` |
| Homepage | `app/(site)/[locale]/page.tsx` and `components/` |
| CMS fields | `sanity/schemas/` |
| CMS menu | `sanity/structure.ts` |
| Booking form handler | `app/api/enquiry/route.ts` |
| Colours and fonts | `app/globals.css` |
| Default hero image | `public/images/bosphorus-hero.png` |

## Languages

Shona has been written with care, but **a native Shona speaker should read it once before launch**: the text in `content/dictionary.ts` (`sn`) and the Shona fields in the CMS. The Turkish and French text is also worth a quick check by a native speaker.

To add a language later (e.g. Arabic), add it to `lib/i18n.ts`, add a dictionary in `content/dictionary.ts`, add the field to `sanity/schemas/locale.ts`, and for Arabic set `dir="rtl"` on `<html>` in `app/(site)/[locale]/layout.tsx`.
