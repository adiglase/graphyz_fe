FROM node:16.0

WORKDIR /frontend-vue

COPY . .

RUN yarn quasar build