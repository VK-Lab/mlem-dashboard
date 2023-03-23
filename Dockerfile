FROM node:16
WORKDIR /project
COPY . .
RUN yarn install --no-cache --frozen-lockfile --ignore-scripts
RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]
