FROM node:18

WORKDIR /app

COPY package*.json ./
COPY . .
RUN npm install
RUN npm install -g knex

EXPOSE 3005

CMD ["sh", "-c", "npx knex migrate:latest && node app.js"]
