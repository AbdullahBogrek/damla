FROM node:18-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package.json package-lock.json* yarn.lock* ./
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]
