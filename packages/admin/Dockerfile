FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

# Build BASE
FROM base as deps

WORKDIR /app
COPY package.json .
COPY pnpm-*.yaml .
COPY ./package.json ./package.json
RUN pnpm i

# Build Image
FROM base AS build

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
ARG NEXT_FILE_ENV=production
ENV NEXT_FILE_ENV=$NEXT_FILE_ENV
COPY . .
COPY public .

COPY ./.env.$NEXT_FILE_ENV ./.env.production

RUN pnpm build

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/next.config.js ./next.config.js
COPY --from=build /app/next-i18next.config.js ./next-i18next.config.js
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
