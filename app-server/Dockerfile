# ./app-server/Dockerfile file:
FROM node:16.6.2-bullseye-slim
WORKDIR /app
RUN apt update && apt install -y curl nano telnet
COPY ./src/package.json .
RUN npm install
RUN npm install cors
COPY ./src .
CMD ["npm", "start"]
