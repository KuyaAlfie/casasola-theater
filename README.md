# Casasola Theater

Touch-friendly React + Vite launcher for Jellyfin, Navidrome, and Plex. Separate from `casasola-io`; no changes to the main site are required.

## Development

Node 22. Install with `pnpm install`, run `pnpm dev`, validate with `pnpm test` and `pnpm build`.

## Cloudflare Pages Git deployment

- Repository: `KuyaAlfie/casasola-theater`
- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: repository root (leave blank)
- Node version: 22 (`.node-version`)

Create a **Pages** project under Workers & Pages and connect this repository. After the first successful deployment, open **Custom domains → Set up a domain**, enter `tesla.casasola.io`, and allow Cloudflare to create the DNS record for this subdomain. Do not change the apex or `www` records. Add the domain through Pages before creating a CNAME manually.

## Service links

Default addresses are declared in `src/main.jsx`. **Edit links** stores overrides locally in each browser; no server, credentials, or account synchronization are involved. Use full HTTPS addresses reachable from the vehicle. Each service handles its own authentication.

## Tesla Theater and fallback

Theater links navigate in the same window through `https://www.youtube.com/redirect?q=...`. Follow YouTube's destination link when prompted. This is an unofficial, firmware-dependent workaround, not a guaranteed fullscreen API. The launcher never automatically redirects on page load, so returning to it cannot create a redirect loop.

Every configured app has an **Open directly** fallback. **Enter Theater** reopens the launcher itself via the redirect; it requires a deployed HTTPS origin. Local HTTP preview is for layout and interaction checks. Use the launcher while parked.

Reference implementation of the redirect approach: https://github.com/MichaelTrip/tesladash

## Verification limits

Build and URL tests do not establish in-car playback compatibility. After deployment, verify the HTTPS site, each service's login and playback, and the Theater redirect in the actual Tesla. Codec support, service availability, authentication, and fullscreen behavior remain dependent on the media servers and vehicle browser.
