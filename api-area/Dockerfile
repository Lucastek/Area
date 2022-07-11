FROM node:latest as tsc-builder

WORKDIR /usr/src/app

COPY ["package*.json", "tsconfig.json", "src", ".envrc", "./"]

RUN npm install && npx tsc

FROM node:latest as runtime-container

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY --from=tsc-builder /usr/src/app/dist ./dist
COPY --from=tsc-builder  /usr/src/app/package*.json ./
COPY --from=tsc-builder  /usr/src/app/.envrc ./

ENV SERVER_PORT=8080
ENV SERVER_HOST=localhost
ENV NODE_ENV=develop
ENV JWT_SECRET="ananas pizzas ain't really bad"
ENV GOOGLE_CLIENT_ID=643605959592-vp17a52h3196d544teg4616k1496ufv1.apps.googleusercontent.com
ENV GOOGLE_CLIENT_SECRET=SF0BZQm7N2I2sP9_dLepCWcq
ENV GITHUB_CLIENT_ID="919dcc45602ba0b18b15"
ENV GITHUB_CLIENT_SECRET="e2c1920e618c144aa4bbeb6f25a9b4c56b39f51b"
ENV FACEBOOK_CLIENT_ID="377900860306439"
ENV HOST_MONGO="area-database"

RUN npm install --production

EXPOSE 8080

ENTRYPOINT ["node", "./dist/server.js"]
