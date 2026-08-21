---
name: verify
description: Build/launch/drive recipe for runtime-verifying changes in caseirinhas-tata-next (single-package Next.js repo).
---

# Verify recipe — caseirinhas-tata-next

## Build gotcha (do this first, every time)

`node_modules` is committed to git in this repo (no `.gitignore` entry
for it) and is missing the linux-x64-gnu native binary for
`lightningcss` (Tailwind v4 dependency). `npm run build` fails with
`Cannot find module '../lightningcss.linux-x64-gnu.node'` until you
run:

```bash
npm install lightningcss --no-save
```

`--no-save` keeps `package.json`/`package-lock.json` untouched. This
command also leaves new files under `node_modules/` (untracked) and
modifies some already-tracked ones (`node_modules/lightningcss/...`,
`node_modules/.package-lock.json`). **Always clean up after
verifying**, since node_modules is tracked:

```bash
git checkout -- node_modules package.json package-lock.json
git clean -fdq node_modules
```

## Build + launch

```bash
npm run build   # after the lightningcss install above
npm run start -- -p <PORT>   # foreground process; run via nohup+disown to background it
```

Don't use `pkill -f "next start"` to stop it — in this sandbox it has
repeatedly killed the calling shell/tool call itself (exit 144)
instead of (or in addition to) the target. Find the real PID via the
port instead and kill that:

```bash
fuser -k <PORT>/tcp
```

## Env vars for driving the app locally

None are required to boot. For exercising the WhatsApp webhook and
SEO-audit routes, set:

```bash
WHATSAPP_VERIFY_TOKEN=<anything>   # GET handshake
WHATSAPP_APP_SECRET=<anything>     # HMAC signing secret for POST body
WHATSAPP_TOKEN=<anything>          # set it to see real Graph API round-trips
                                    # (401 Invalid OAuth token) instead of the
                                    # early-return guard — proves the code path
                                    # actually reaches graph.facebook.com
SEO_AUDIT_SECRET=<anything>        # gates /api/seo-audit
```

`WHATSAPP_PHONE_NUMBER_ID` is NOT used anymore (removed — the webhook
now replies using `value.metadata.phone_number_id` from the inbound
payload, so it supports multiple numbers/WABAs on one app).

## Surfaces worth driving

- **`GET /api/whatsapp/webhook`** — verify handshake:
  `?hub.mode=subscribe&hub.verify_token=<WHATSAPP_VERIFY_TOKEN>&hub.challenge=X`
  → 200 body `X`. Wrong/missing token → 403.

- **`POST /api/whatsapp/webhook`** — needs a valid
  `x-hub-signature-256: sha256=<hmac-sha256(body, WHATSAPP_APP_SECRET)>`
  header or it 401s. Minimal body:
  ```json
  {"entry":[{"changes":[{"value":{"metadata":{"phone_number_id":"X"},"messages":[{"from":"55...","text":{"body":"oi"}}]}}]}]}
  ```
  Use two different `phone_number_id` values in two requests to prove
  the multi-number routing fix (each should independently reach
  `graph.facebook.com/.../<that id>/messages`, visible as a real
  401-from-Meta in server logs if `WHATSAPP_TOKEN` is set to junk).
  Interactive replies use `messages[0].interactive.button_reply.id` or
  `.list_reply.id` instead of `.text.body` — e.g. id
  `tamanho|segunda|-|mini` drives the "escolheu tamanho" branch.

- **`GET /api/seo-audit?secret=X`** — 401 unless `X` equals
  `SEO_AUDIT_SECRET` (fails closed if that env var is unset — verified
  as a probe). With the right secret but no `APIFY_API_TOKEN`, returns
  500 `"APIFY_API_TOKEN não configurado."` rather than silently
  calling Apify with a placeholder token.

- **`GET /produtos.csv`** — static-ish feed, no env needed. Check
  `availability_circle_radius` field (last CSV column) is a bare
  number like `"10"`, never `"10km"` — Meta's Commerce Manager rejects
  non-numeric values here (`property_value_non_numeric` diagnostic,
  confirmed via the Marketing API's `ads_catalog_get_diagnostics`
  against the "Cardápio - Semanal" catalog).

## Local port note

Any free port works; `3200` was used in the last verification pass —
no significance, just avoid colliding with a port already bound by a
leftover background `next start` from earlier in the session (check
with `fuser <PORT>/tcp` before launching).
