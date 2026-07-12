# Base image — Node.js ka lightweight version
FROM node:20-alpine

# Container ke andar working directory set karo
WORKDIR /app

# Pehle sirf package.json copy karo (caching ke liye)
COPY package*.json ./

# Dependencies install karo
RUN npm install

# Baaki saara code copy karo
COPY . .

# TypeScript ko compile karo (JS mein convert)
RUN npm run build

# Container ka port expose karo
EXPOSE 5000

# App start karne ka command
CMD ["node", "dist/app.js"]