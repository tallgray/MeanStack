# ./web-server/Dockerfile file:
FROM nginx:latest
RUN apt update && apt install -y curl nano
COPY ./src/html/ /usr/share/nginx/html/
COPY ./src/conf/default.conf /etc/nginx/conf.d/
