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

ARG REACT_APP_SERVICE_URL
ARG REACT_APP_AUTH_API_KEY
ARG REACT_APP_TMDB_API_KEY

ENV REACT_APP_SERVICE_URL=$REACT_APP_SERVICE_URL
ENV REACT_APP_AUTH_API_KEY=$REACT_APP_AUTH_API_KEY
ENV REACT_APP_TMDB_API_KEY=$REACT_APP_TMDB_API_KEY

ENV PORT=3000

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
