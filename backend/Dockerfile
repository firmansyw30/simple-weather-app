# syntax=docker/dockerfile:1

ARG NODE_VERSION=24

# ============================================================
# Base
# ============================================================
FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /usr/src/app


# ============================================================
# Build - compile TypeScript
# ============================================================
FROM base AS build

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

COPY . .

RUN npm run build


# ============================================================
# Runtime
# ============================================================
FROM base AS final

ENV NODE_ENV=production

ARG INFISICAL_PROJECT_ID
ENV INFISICAL_PROJECT_ID=$INFISICAL_PROJECT_ID

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

RUN apk add --no-cache bash wget \
    && wget -qO- 'https://artifacts-cli.infisical.com/setup.apk.sh' | sh \
    && apk add --no-cache infisical

USER node

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json ./

#EXPOSE 3001
EXPOSE 3000

CMD ["sh", "-c", "infisical run --projectId=${INFISICAL_PROJECT_ID} --env=dev -- node dist/index.js"]