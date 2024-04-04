FROM node:18-alpine

LABEL maintainer="ibrahimadlani"

WORKDIR /app

COPY public/ /app/public
COPY src/ /app/src
COPY package.json /app/

RUN npm install
RUN npm install react-scripts --save
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]