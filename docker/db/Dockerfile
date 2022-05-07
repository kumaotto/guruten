FROM --platform=linux/x86_64 mysql:5.7.31
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 467B942D3A79BD29
RUN apt-get update
RUN apt-get -y install 
RUN apt-get update && apt-get install -y \
    locales-all \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:ja
ENV LC_ALL ja_JP.UTF-8
