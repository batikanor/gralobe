ARG NODE_IMAGE=node:24.7.0-bookworm-slim
ARG PLAYWRIGHT_IMAGE=mcr.microsoft.com/playwright:v1.57.0-noble
ARG NGINX_IMAGE=nginx:1.28-alpine

FROM ${NODE_IMAGE} AS development
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

FROM development AS test
ENV CI=true
CMD ["sh", "-c", "npm test && npx tsc --noEmit && npm run build:lib && test -s dist/index.d.ts && npm run build && test -s dist/index.html"]

FROM ${PLAYWRIGHT_IMAGE} AS browser
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ENV CI=true
CMD ["npm", "run", "test:e2e"]

FROM development AS builder
RUN npm run build

FROM ${NGINX_IMAGE} AS runtime
COPY deploy/nginx.conf /etc/nginx/nginx.conf
RUN rm -f /etc/nginx/conf.d/default.conf
COPY --from=builder --chown=101:101 /app/dist/ /usr/share/nginx/html/
USER 101:101
EXPOSE 8080
STOPSIGNAL SIGQUIT
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -q -T 2 -O - http://127.0.0.1:8080/healthz | grep -qx ok || exit 1
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
