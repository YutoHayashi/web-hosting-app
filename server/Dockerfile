FROM centos:8

ENV CONTAINER server

RUN (cd /lib/systemd/system/sysinit.target.wants/; for i in *; do [ $i == systemd-tmpfiles-setup.service ] || rm -f $i; done); \
    rm -f /lib/systemd/system/multi-user.target.wants/*; \
    rm -f /etc/systemd/system/*.wants/*; \
    rm -f /lib/systemd/system/local-fs.target.wants/*; \
    rm -f /lib/systemd/system/sockets.target.wants/*udev*; \
    rm -f /lib/systemd/system/sockets.target.wants/*initctl*; \
    rm -f /lib/systemd/system/basic.target.wants/*;\
    rm -f /lib/systemd/system/anaconda.target.wants/*;

RUN dnf update -y

RUN dnf install -y \
    httpd \
    httpd-tools \
    httpd-devel \
    httpd-manual \
    openssl \
    openssl-devel \
    python3-mod_wsgi \
    python38 \
    python3-devel \
    mysql-devel \
    gcc \
    && \
    dnf clean all

# RUN systemctl start httpd && \
#     systemctl enable httpd

COPY httpd.conf /etc/httpd/conf/httpd.conf
ADD vhost.conf /etc/httpd/conf.d/
ADD requirements.txt /

RUN pip3 install -r /requirements.txt

WORKDIR /api/mouse

EXPOSE 80
EXPOSE 443

VOLUME [ "/sys/fs/cgroup" ]
