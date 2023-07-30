# build stage
FROM node:lts-alpine

RUN mkdir -p /app
WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install --force

COPY . .

# RUN npm run build 
# RUN npm run generate --spa

CMD ["npm", "run", "generate", "--spa"]