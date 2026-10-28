# Gralobe on Hetzner

All production, staging, preview and asset hosting uses Hetzner. Vercel resources
require direct owner approval for the specific project, environment and service.
Automatic Vercel Git deployment stays disabled in `vercel.json`.

The public demo is `https://gralobe.maptheory.org/`. Its existing Caddy site sends
traffic to `gralobe-production-web:8080` on the external `maptheory-edge` Docker
network. The website has no database, uploads, secrets or persistent application
state. The independent MapTheory analytics/monitoring services and their storage
are preserved. Gralobe itself does not add visitor tracking.

## Build and validate

Build on the development machine through Docker, avoiding build load and language
runtime installation on the production server. The vendoring script retains
verified asset bytes, source URLs, checksums and license notices. Demo browser
assets are served from the same Hetzner origin; library builds retain their
existing portable configuration.

```sh
docker compose --profile test run --build --rm test
docker compose --profile test run --build --rm e2e
docker build --platform linux/amd64 --target runtime \
  --build-arg GRALOBE_REVISION="$(git rev-parse HEAD)" \
  --tag "gralobe:sha-$(git rev-parse HEAD)" .
```

Runtime identity is recorded in the OCI revision label and `/release.json`.
Save the exact image with `docker save`, transfer it over the existing private SSH
connection, and load it with `docker load`. No registry or public application port
is required.

## Activate

Create an immutable release directory under `/srv/apps/gralobe`, retaining its
source, image ID, source commit, vendor manifest and Compose configuration. Use
the existing `gralobe-production` project, network and proxy alias. Its
`production.env` follows `.env.example` and pins the exact locally loaded image.

```sh
docker compose --env-file production.env -f compose.shared-proxy.yaml config --quiet
docker compose --env-file production.env -f compose.shared-proxy.yaml \
  up --detach --wait --wait-timeout 60 web
```

Verify public HTTPS, `/healthz`, `/release.json`, an actual JavaScript asset,
anonymous WebGL rendering, historical charts and search/watchlist controls.
The public browser check also verifies that fetched website assets stay on this
origin. Only then record the release as current. No DNS or shared-proxy change is
needed for the existing public hostname.

## Rollback

Before activating, record the exact prior image and Compose working directory.
Keep both until the new public release and rollback path are verified. To restore,
run the same activation command from that prior directory with its original
`production.env`. This recreates only Gralobe's `web` service. Do not remove
unrelated containers, Docker volumes, monitoring/analytics history or retained
production/staging releases. Do not run Docker system/volume prune.
