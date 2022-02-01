ARG POSTGRES_VERSION

FROM postgres:${POSTGRES_VERSION}

ARG TIMEZONE

# set time zone
RUN ln -snf /usr/share/zoneinfo/${TIMEZONE} /etc/localtime \
  && echo ${TIMEZONE} > /etc/timezone

# add bacKup job
RUN mkdir -p /opt/backup
RUN mkdir -p /opt/restore
COPY ./pgbackup.sh /opt/pgbackup.sh
RUN chmod +x /opt/pgbackup.sh

COPY ./init.sh /docker-entrypoint-initdb.d/

# create volume for backups
VOLUME ["/opt/backup"]
VOLUME ["/opt/restore"]
