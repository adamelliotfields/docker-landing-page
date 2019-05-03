FROM node:10.15.3-alpine

COPY . /usr/src/landing-page

WORKDIR /usr/src/landing-page

ENV NODE_ENV production

RUN chown -R node:node /usr/src/landing-page && \
    apk add --no-cache curl tini && \
    npm install --production

USER node

EXPOSE 3000

CMD ["/sbin/tini", "--", "/usr/local/bin/node", "/usr/src/landing-page/bin/www.js"]
