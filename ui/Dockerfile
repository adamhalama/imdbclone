# WORKDIR /app

# # Root
# COPY node_modules ./node_modules
# COPY package.json ./package.json
# COPY yarn.lock ./yarn.lock
# COPY database/migrate.ts ./database/migrate.ts
# COPY prisma/migrations ./prisma/migrations
# COPY prisma/schema.prisma ./prisma/schema.prisma
# COPY dist ./dist

# EXPOSE 3000

# #TO change
# #ENTRYPOINT yarn run start:api

# ENTRYPOINT yarn run dev


#######

FROM node:16

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN yarn install

# Copying source files
COPY . .

# Building app
RUN yarn run build

EXPOSE 3000

# Running the app
# CMD [ "yarn", "start" ]
ENTRYPOINT yarn run start