FROM node:latest
RUN npm i
RUN npm run build
COPY . .
ENTRYPOINT ["node", "./server.js"]
