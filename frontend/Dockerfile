
# ==============================
# stage 1 - build
# ==============================
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build


# ==============================
# stage 2 - Nginx
# ==============================
FROM nginx:alpine
# remove default page
RUN rm -rf /usr/share/nginx/html/*
# build copy
COPY --from=builder /app/dist /usr/share/nginx/html
# default nginx port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]