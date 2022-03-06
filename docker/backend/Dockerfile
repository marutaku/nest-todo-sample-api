FROM node:17.6.0

RUN yarn global add @nestjs/cli

WORKDIR /workspace
COPY ./package.json ./
COPY yarn.lock ./

RUN yarn install

CMD ["yarn", "start:dev"]
