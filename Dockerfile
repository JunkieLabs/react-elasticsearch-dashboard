FROM node:18.13.0


WORKDIR /usr/src/app

COPY package.json ./

COPY package-lock.json ./

RUN apt-get update

RUN apt-get install -y python

# RUN npm install -g npm@latest --loglevel=error



COPY . .


# COPY .env.production .



RUN npm install  
# --force 
# --loglevel=error

ENV NEXT_ELASTIC_URL http://10.27.14.126:9200

# ENV NEXT_ELASTIC_URL http://192.168.1.16:9200

RUN npm run build

# CMD ["npm", "run", "build"]

# RUN chmod +x develop.sh


# ENTRYPOINT ["./develop.sh", "start"]
CMD ["npm", "run", "start"]