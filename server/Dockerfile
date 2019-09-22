FROM node:alpine as base

RUN mkdir /app
WORKDIR /app

ENV PATH ./node_modules/.bin:$PATH
COPY ./package.json .
COPY ./yarn.lock .
COPY ./tsconfig.json .
COPY ./tslint.json .
COPY ./server.CA.key .

FROM base as dependencies
RUN yarn install --production --no-progress --pure-lockfile
RUN cp -R node_modules prod_node_modules
RUN yarn install

# Test
FROM dependencies as test
COPY ./src ./src
RUN yarn lint
RUN yarn src-build

# Release
FROM base as release
COPY --from=dependencies ./app/prod_node_modules node_modules
COPY --from=test ./app/src ./src
COPY /src/index.js ./src/index.js

EXPOSE 3000

CMD [ "node", "src/index.js" ]