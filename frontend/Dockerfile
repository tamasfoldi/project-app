ARG NODE_BASE_VERSION

FROM node:${NODE_BASE_VERSION}

WORKDIR /srv/app

COPY ./app/package.json ./
COPY ./app/package-lock.json ./
RUN npm ci

EXPOSE 4200

CMD [ "npm", "start" ]
