# syntax=docker/dockerfile:1.7

# =========================================================
# AI E-Health — Hypertension Risk Predictor
# Multi-stage Dockerfile (build → runtime)
# =========================================================

# ---------- Stage 1: deps ----------
FROM node:20-slim AS deps
WORKDIR /app

# Install bun (used as package manager / runtime in this project)
RUN npm install -g bun

# Copy lockfile + manifests for caching
COPY package.json bun.lock* ./
COPY prisma ./prisma

# Install dependencies (frozen lockfile)
RUN bun install --frozen-lockfile || bun install

# ---------- Stage 2: builder ----------
FROM node:20-slim AS builder
WORKDIR /app
RUN npm install -g bun

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Build the Next.js standalone output
RUN bun run db:generate || true
RUN bun run build

# ---------- Stage 3: runner ----------
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Install only the system packages required at runtime
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# Copy standalone build + public assets
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://localhost:3000/api/predict').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
