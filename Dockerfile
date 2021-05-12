FROM node:12.19.0-alpine3.9 AS development

RUN mkdir /app

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . .

RUN npm run build  

FROM nginx:1.17 as production

COPY --from=development /app/build  /usr/share/nginx/html



