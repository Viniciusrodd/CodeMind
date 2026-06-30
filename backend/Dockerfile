
# ==============================
# stage 1 - build
# ==============================
FROM node:22-alpine AS builder
WORKDIR /app
# COPY <host-path> <image-path>
COPY package*.json ./
RUN npm ci
COPY . .
# ts compile
RUN npm run build


# ==============================
# stage 2 - run
# ==============================
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
# install just production dependencies
COPY package*.json ./
RUN npm ci --omit=dev
# build copy
COPY --from=builder /app/dist ./dist
# api port
EXPOSE 5225
# app init
CMD ["node", "dist/app.js"]