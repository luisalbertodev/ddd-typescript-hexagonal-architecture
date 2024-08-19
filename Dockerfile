FROM node:20.16.0-slim

WORKDIR /code

COPY package.json package-lock.json ./
RUN npm install
