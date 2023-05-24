FROM node:16-alpine
WORKDIR /usr/app

COPY package*.json /usr/app
COPY src /usr/app/src

RUN npm install
RUN npm install -g pm2

EXPOSE 3000
EXPOSE 9200