FROM asoltys/maven-server:base

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
ENV NODE_OPTIONS --openssl-legacy-provider

WORKDIR /app

COPY . .
RUN mv /deps/node_modules /app

CMD ["pnpm", "start"]
