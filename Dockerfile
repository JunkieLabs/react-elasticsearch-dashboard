FROM node:18.13.0

ARG DOCKERFILE_ELASTIC_URL="http://localhost:9200"

WORKDIR /usr/src/app

COPY package.json ./

COPY package-lock.json ./

RUN apt-get update

RUN apt-get install -y python

# RUN npm install -g npm@latest --loglevel=error


RUN echo $DOCKERFILE_ELASTIC_URL


COPY . .


# COPY .env.docker .


ENV NEXT_ELASTIC_URL="${DOCKERFILE_ELASTIC_URL}"


RUN echo $NEXT_ELASTIC_URL

RUN npm install  
# --force 
# --loglevel=error


# http://192.168.0.102:9200

RUN npm run build

# CMD ["npm", "run", "build"]

# RUN chmod +x develop.sh


# ENTRYPOINT ["./develop.sh", "start"]
CMD ["npm", "run", "start"]