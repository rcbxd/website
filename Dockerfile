FROM node:12.9.0-alpine as build
MAINTAINER rcbxd
ENV personalnodesite 1
RUN adduser -D rcbxd

RUN mkdir /app
WORKDIR /app
COPY ./ /app

RUN apk add --update --no-cache nodejs npm
RUN npm i --silent

USER rcbxd

FROM build as app
RUN node server.js


