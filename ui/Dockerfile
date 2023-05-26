# Stage 2: Serve the React app using serve
FROM --platform=linux/amd64 node:16 as runtime
WORKDIR /usr/src/app

# Root
COPY ./package.json ./package.json
COPY ./build ./build
COPY ./yarn.lock ./yarn.lock
COPY ./node_modules ./node_modules

RUN yarn global add serve

ARG REACT_APP_SERVICE_URL
ARG REACT_APP_AUTH_API_KEY
ARG REACT_APP_TMDB_API_KEY
ARG REACT_APP_ENV

ENV REACT_APP_SERVICE_URL=$REACT_APP_SERVICE_URL
ENV REACT_APP_AUTH_API_KEY=$REACT_APP_AUTH_API_KEY
ENV REACT_APP_TMDB_API_KEY=$REACT_APP_TMDB_API_KEY
ENV REACT_APP_ENV=$REACT_APP_ENV

ENV PORT=3000

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
