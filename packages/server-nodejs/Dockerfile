FROM node:14

WORKDIR /server
COPY . .
RUN npm install

EXPOSE 5000
CMD [ "npm", "run", "start:prod" ]
