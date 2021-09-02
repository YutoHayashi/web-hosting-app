FROM mysql:5.7

WORKDIR /var/lib/mysql

ENV MYSQL_ROOT_HOST=172.10.0.10
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=application
ENV MYSQL_USER=admin
ENV MYSQL_PASSWORD=admin

CMD [ "mysqld", "--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci" ]
