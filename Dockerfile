FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
RUN apk --no-cache --virtual .node-gyp-compilation-dependencies add \
    g++ \
    make \
    python3 \
    # And runtime dependencies, which we keep
    && apk --no-cache add \
    bash \
    ca-certificates
COPY ["package.json", "package-lock.json*", "./"]
RUN yarn install --production=true --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["yarn", "start:prod"]
