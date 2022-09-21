FROM node:14-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
ENV MONGODB_URI mongodb://mongoadmin:secret@victorupm.duckdns.org:8817/stardustgameDB?directConnection=true&serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-256
#RUN npm run builddev
RUN npm run build
EXPOSE 3000
CMD [ "npm", "start" ]
