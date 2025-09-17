# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy rest of the application
COPY . .

# Expose app port
EXPOSE 5000

# Start application
CMD ["npm", "start"]
