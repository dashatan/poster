FROM node:18.6

WORKDIR /app/poster

COPY ./ ./

RUN  yarn install