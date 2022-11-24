FROM node:19-alpine AS builder

RUN npm install --global jsdoc@4.0.0

WORKDIR /opt/go-upload-progress
COPY ./.jsdocrc.json .
COPY ./public/scripts ./public/scripts
RUN jsdoc --configure ./.jsdocrc.json

FROM nginx:1.23-alpine

COPY --from=builder /opt/go-upload-progress/docs/jsdoc /usr/share/nginx/html
