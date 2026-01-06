FROM node:18-alpine

RUN apk add --no-cache curl

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

EXPOSE 7001
CMD ["node", "app.js"]

