FROM ubuntu

MAINTAINER Silvio Paganini <silvio@fluuu.id>

# Create folders and set Volume
RUN mkdir /lab

# Set work directory
# VOLUME /lab
WORKDIR /lab

# create distribution folder and logs folder
RUN mkdir logs
RUN mkdir dist

# install server dependencies
RUN apt-get update && \
    apt-get -y install curl && \
    apt-get -y install git && \
    curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash - && \
    apt-get -y install nginx supervisor python build-essential nodejs

# Copy custom configuration file from the current directory
COPY devops/nginx.conf /etc/nginx/nginx.conf

# replace /var/www/lab with the desired folder
COPY ./dist dist
COPY ./lib lib
COPY ./server-test.js ./server.js
ADD ./devops/supervisord.conf supervisord.conf
RUN chmod +x supervisord.conf

RUN npm install express
RUN npm install socket.io

# Expose Ports
EXPOSE 80 9001

CMD ["/usr/bin/supervisord"]
