FROM node:12.15.0-alpine AS build

WORKDIR /build
COPY package.json /build/package.json
COPY .babelrc /build/.babelrc
COPY .eslintrc /build/.eslintrc
COPY src /build/src

RUN npm install --silent \
 && npm run build \
 && npm prune --production --silent

# Final image

FROM node:12.15.0-alpine

WORKDIR /app
COPY --from=build /build/package.json /app/package.json
COPY --from=build /build/build /app/build
COPY --from=build /build/node_modules /app/node_modules

EXPOSE 3000
CMD ["npm","run","serve"]
