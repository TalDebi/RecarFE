FROM node:latest
WORKDIR /app
COPY . ./app
RUN npm i
RUN npm run build
ENTRYPOINT ["node", "./server.js"]
