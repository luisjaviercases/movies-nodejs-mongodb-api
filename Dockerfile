FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY seedDB.js .

EXPOSE 3001

CMD ["sh", "-c", "node seedDB.js && node api/server.js"]
