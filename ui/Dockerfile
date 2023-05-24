# Stage 1: Build the React app
FROM --platform=linux/amd64 node:16 as build
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# Stage 2: Serve the React app using serve
FROM --platform=linux/amd64 node:16 as runtime
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/build ./build
RUN yarn global add serve

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
