FROM node:16-alpine

WORKDIR / demo
COPY package.json package-lock.json ./

RUN npm install 

COPY . .

RUN npm install -g nodemon

EXPOSE 8080

CMD [ "npm","start" ]