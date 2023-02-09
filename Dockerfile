FROM --platform=linux/amd64 node:16.16.0 as dependencies
WORKDIR /project
COPY . .

RUN yarn install --no-cache --frozen-lockfile --ignore-scripts --production=false
RUN yarn build

EXPOSE 80
CMD ["yarn", "start"]
