FROM node:12.6-alpine

WORKDIR /build-tmp
COPY package.json /build-tmp/package.json
COPY .babelrc /build-tmp/.babelrc
COPY .eslintrc /build-tmp/.eslintrc
COPY src /build-tmp/src

RUN npm install --silent
RUN npm run build

RUN npm prune --production --silent

WORKDIR /app
RUN mv /build-tmp/package.json /app/package.json \
 && mv /build-tmp/build /app/build \
 && mv /build-tmp/node_modules /app/node_modules \
 && rm -rf /build-tmp

EXPOSE 3000
CMD ["npm","run","serve"]
