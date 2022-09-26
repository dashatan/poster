FROM node:18

WORKDIR /app/poster

COPY package.json ./

RUN  npm install

COPY ./ ./