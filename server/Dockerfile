FROM node:10 AS builder
ENV NODE_ENV=production
ENV TS_NODE_FILES=true

COPY . ./
RUN yarn install --production=false
RUN yarn build
RUN yarn install

FROM node:10
ENV NODE_ENV=production
ENV PORT=8000
WORKDIR /usr/src/app
COPY --from=builder node_modules node_modules
COPY --from=builder dist dist
COPY --from=builder package.json ./
EXPOSE 8000
CMD ["yarn", "start"]
