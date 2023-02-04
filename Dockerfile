FROM composer:2 as composer
FROM node:19.6.0-slim as node
FROM php:8.2-fpm-alpine as base


# Necessary tools
RUN apk add --update --no-cache ${PHPIZE_DEPS} git curl

# ZIP module
RUN apk add --no-cache libzip-dev && docker-php-ext-configure zip && docker-php-ext-install zip

# Imagick module
RUN apk add --no-cache libgomp imagemagick imagemagick-dev && \
	pecl install -o -f imagick && \
	docker-php-ext-enable imagick

# Symfony CLI tool
RUN apk add --no-cache bash && \
	curl -1sLf 'https://dl.cloudsmith.io/public/symfony/stable/setup.alpine.sh' | bash && \
	apk add symfony-cli && \
	apk del bash

# Necessary build deps not longer needed
RUN apk del --no-cache ${PHPIZE_DEPS}

# Composer
COPY --from=composer /usr/bin/composer /usr/local/bin/composer

# Node & Yarn
RUN set -eux \
    & apk add \
        --no-cache \
        nodejs \
        yarn

# Clean up image
RUN rm -rf /tmp/* /var/cache

