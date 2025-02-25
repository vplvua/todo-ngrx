FROM node:22-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY start-app.sh /start-app.sh
RUN chmod +x /start-app.sh

EXPOSE 4200 3000

# Use our custom entrypoint script
ENTRYPOINT ["/start-app.sh"]