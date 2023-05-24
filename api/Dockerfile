FROM --platform=linux/amd64 node:16 as runtime

WORKDIR /usr/src/app

# Root
COPY node_modules ./node_modules
COPY package.json ./package.json
COPY yarn.lock ./yarn.lock
COPY database/migrate.ts ./database/migrate.ts
COPY prisma/migrations ./prisma/migrations
COPY prisma/schema.prisma ./prisma/schema.prisma
COPY dist ./dist

ENV PORT=5001
ENV API_AUTH_KEY=1234
ENV SECRET_KEY=1234

RUN npx prisma migrate deploy

EXPOSE 5001
ENTRYPOINT yarn run prod
