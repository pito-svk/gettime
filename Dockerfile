FROM node:8.9.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN apt-get update
RUN npm install

COPY . /usr/src/app

RUN npm run build

ENV NODE_ENV production

CMD ["node", "app/server.js"]