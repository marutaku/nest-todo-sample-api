FROM node:16.20.2

RUN yarn global add @nestjs/cli

WORKDIR /workspace
COPY ./package.json ./
COPY yarn.lock ./

RUN yarn install

CMD ["yarn", "start:dev"]
