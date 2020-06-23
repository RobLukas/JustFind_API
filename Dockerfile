FROM node:12 as development
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY . .
CMD [ "npm", "run", "start:dev"  ]