FROM node:latest

RUN mkdir /src
WORKDIR /src

ENV PATH ./node_modules/.bin:$PATH

COPY /src .

RUN yarn install

ENTRYPOINT [ "node", "index.js" ]