# Project agent instructions

## Hosting

All environments, runtimes, databases, uploads and static assets must use Hetzner.
Vercel resources and deployments require direct owner approval for the specific
project, environment and service. Existing deployments and configuration are not
approval. Preserve historical recovery material without re-enabling deployment.
Keep automatic Vercel Git deployments disabled in `vercel.json`.

## Development and validation

Run application package installation, builds, tests and development servers in
Docker containers. Do not require a host Node.js runtime or package manager.
See README.md for Docker Compose commands. Preserve existing application layout.
Read `.github/AI_GUIDELINES.md` for contribution and test requirements.
