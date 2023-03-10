FROM php:8.2-fpm

RUN apt-get update && apt-get install -yq gnupg && \
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && \
    curl -sL https://deb.nodesource.com/setup_16.x | bash -  && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -yq libicu-dev libzip-dev git nodejs yarn wget && \
    docker-php-ext-install intl zip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*


