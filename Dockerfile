# Use an official Node.js runtime as the base image
FROM node:lts



# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY prisma ./prisma/
COPY . .

# Install project dependencies

RUN npm install

RUN npx prisma generate --schema ./prisma/schema.prisma

# Copy the entire source code (including the src folder) to the working directory


# Build TypeScript code (assumes you have a tsconfig.json file in your project)
RUN npx tsc

# Expose a port if your app listens on a specific port
EXPOSE 4000

# Start your application
# CMD [ "node", "dist/index.js" ]

CMD [ "npm", "run", "start:migrate:prod" ]
