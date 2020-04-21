FROM node:13.12.0-alpine3.11

WORKDIR /app

COPY package.json .
RUN  yarn install

COPY  src ./src

CMD ["yarn", "start"]

