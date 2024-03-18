FROM node:latest
WORKDIR /
RUN npm i
RUN npm run build
COPY . .
ENTRYPOINT ["node", "./server.js"]
