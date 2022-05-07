FROM node:14.0.0-alpine3.11 as build-stage

WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY src/ ./src/
RUN yarn run build

FROM nginx:1.17.10-alpine

RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY docker/nginx/default.conf /etc/nginx/default.conf
