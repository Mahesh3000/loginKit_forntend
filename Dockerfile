# Step 1: Build the Vite app
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build  # Build the app for production

# Step 2: Serve with Nginx
FROM nginx:alpine
# Copy the build output to Nginx's public folder
COPY --from=build /app/dist /usr/share/nginx/html  

EXPOSE 5173
# Nginx runs on port 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]  



# FROM node:18-alpine

# WORKDIR /app

# COPY package.json .

# RUN npm install

# COPY . .

# EXPOSE 5173

# CMD ["npm","run","dev"]