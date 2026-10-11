# Next. js is built on top of React and runs on top of Node.js, 
# hence we will use the Node.js image as the base image.
FROM node:25-alpine AS base
# Let corepack fetch the pinned pnpm without an interactive prompt
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies with the pnpm version pinned in package.json (packageManager)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js anonymous telemetry during the build
ENV NEXT_TELEMETRY_DISABLED=1

RUN corepack enable pnpm && pnpm build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Security best practices: create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 -G nodejs nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next

# Needed because: By changing the ownership of the .next directory, we are ensuring that the nextjs
# user has the necessary permissions to read from and write to this directory.
# This is needed for because Next.js needs to access and potentially modify files in this directory during runtime.
# Also: Setting the correct ownership helps maintain the principle of least privilege. 
# The application runs as the nextjs user, so it should only have access to the directories 
# and files it needs to function.
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]
