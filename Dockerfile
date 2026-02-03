FROM node:22-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json .npmrc ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build
RUN npm prune --omit=dev

FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 3000
CMD ["npm", "run", "start"]
