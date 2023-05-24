FROM --platform=linux/amd64 node:16 as runtime

WORKDIR /usr/src/app

# Root
COPY node_modules ./node_modules
COPY package.json ./package.json
COPY yarn.lock ./yarn.lock
COPY prisma/migrations ./prisma/migrations
COPY prisma/schema.prisma ./prisma/schema.prisma
COPY dist ./dist


ARG AUTH_API_KEY
ARG SECRET_KEY
ARG DATABASE_URL

ENV AUTH_API_KEY=$AUTH_API_KEY
ENV SECRET_KEY=$SECRET_KEY
ENV DATABASE_URL=$DATABASE_URL

RUN echo ${DATABASE_URL}

ENV PORT=5001

RUN yarn prisma migrate deploy

EXPOSE 5001
ENTRYPOINT yarn run prod
