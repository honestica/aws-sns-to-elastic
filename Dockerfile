FROM node:12.6-alpine

RUN mkdir -p /build-tmp
WORKDIR /build-tmp
ADD package.json /build-tmp/package.json
ADD .babelrc /build-tmp/.babelrc
ADD .eslintrc /build-tmp/.eslintrc
ADD src /build-tmp/src

RUN npm install --silent
RUN npm run build

RUN npm prune --production --silent
#
RUN mkdir -p /app
#
RUN mv /build-tmp/package.json /app/package.json && \
   mv /build-tmp/build /app/build && \
	mv /build-tmp/node_modules /app/node_modules
#
## FINISH
RUN rm -rf /build-tmp
#
WORKDIR /app

EXPOSE 3000
CMD ["npm","run","serve"]
