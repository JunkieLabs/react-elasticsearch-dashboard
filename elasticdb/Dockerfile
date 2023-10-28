ARG ELASTIC_VERSION

# ENV KIBANA_VERSION=$ELASTIC_VERSION



# Use the official Kibana image as the base image
FROM docker.elastic.co/kibana/kibana:$ELASTIC_VERSION

# WORKDIR /usr/src/kibana

RUN echo "ELASTICSEARCH_URL: $ELASTICSEARCH_URL"
# USER root
# Copy the init_kibana.sh script into the image
COPY /kibana/init.sh /usr/share/kibana/init_kibana.sh


# COPY custom-entrypoint.sh /app-entrypoint.sh
# USER kibana
# # Make the script executable
# RUN chmod +x /usr/share/kibana/init.sh

USER root
RUN apt-get update && apt-get install -y jq


RUN chmod 755 /usr/share/kibana/init_kibana.sh
# RUN ./usr/share/kibana/init_kibana.sh
# RUN chmod 755 /scripts/myScript.sh
USER kibana

# RUN chmod +x /usr/share/kibana/init_kibana.sh

# # Define the command to run Kibana
CMD ["/usr/share/kibana/init_kibana.sh"]