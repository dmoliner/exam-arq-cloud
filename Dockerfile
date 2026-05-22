# Utilitzem una imatge de Node.js lleugera
FROM node:18-alpine

# Creem el directori de l'aplicació dins del contenidor
WORKDIR /app

# Copiem el package.json per instal·lar dependencies
COPY package*.json ./

# Instal·lem les dependències de producció
RUN npm install --only=production

# Copiem la resta dels arxius de l'aplicació
COPY . .

# Exposem el port 3000
EXPOSE 3000

# Definim la comanda per arrencar el servidor
CMD ["node", "server.js"]