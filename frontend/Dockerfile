# syntax=docker/dockerfile:1

ARG NODE_VERSION=24
ARG INFISICAL_PROJECT_ID
ENV INFISICAL_PROJECT_ID=$INFISICAL_PROJECT_ID

################################################################################
# Base
FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /usr/src/app


################################################################################
# Dependencies
FROM base AS deps

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci


################################################################################
# Build
FROM deps AS build

# Install Infisical CLI
RUN apk add --no-cache bash wget \
    && wget -qO- 'https://artifacts-cli.infisical.com/setup.apk.sh' | sh \
    && apk add --no-cache infisical

# Copy source code
COPY . .

# Retrieve environment variables from Infisical
# and inject them only during the build process.
RUN --mount=type=secret,id=infisical_token \
    INFISICAL_TOKEN=$(cat /run/secrets/infisical_token) \
    infisical run \
    --projectId=${INFISICAL_PROJECT_ID} \
    --env=alpha \
    -- \
    npm run build


################################################################################
# Runtime
FROM nginx:alpine AS final

USER node

COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
