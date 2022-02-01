ARG STRAPI_BASE_VERSION

FROM strapi/base:${STRAPI_BASE_VERSION}

ARG TIMEZONE

# set time zone
RUN apk add tzdata \
  && cp /usr/share/zoneinfo/${TIMEZONE} /etc/localtime \
  && apk del tzdata

WORKDIR /srv/app
COPY ./app/package.json ./
COPY ./app/yarn.lock ./
RUN yarn install
COPY ./app .
ENV NODE_ENV production
RUN yarn build

EXPOSE 1337

CMD ["yarn", "start"]
