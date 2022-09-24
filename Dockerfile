FROM node:16-bullseye-slim

WORKDIR /prism-cube

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD [ "yarn", "dev" ]