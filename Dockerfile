# Stage 1: build
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: serve with nginx
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Opcional: copia tu configuración personalizada de nginx
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
