up:
	docker compose up -d

down:
	docker compose down

rebuild:
	docker compose down -v --remove-orphans
	docker compose rm -vsf
	docker compose up -d --build

shell:
	docker compose exec -it fpm sh

bash:
	docker compose exec -it fpm /bin/bash

watch:
	docker compose exec fpm yarn run encore dev --watch

db:
	docker compose exec fpm php bin/console doctrine:database:drop --if-exists --force
	docker compose exec fpm php bin/console doctrine:database:create
	docker compose exec fpm php bin/console doctrine:migrations:migrate -n
	docker compose exec fpm php bin/console hau:fix:load -n

db-test:
	docker compose exec fpm php bin/console doctrine:database:drop --if-exists --force --env=test
	docker compose exec fpm php bin/console doctrine:database:create --env=test
	docker compose exec fpm php bin/console doctrine:migrations:migrate -n --env=test
	docker compose exec fpm php bin/console hau:fix:load -n --env=test

behat:
	docker compose exec fpm php vendor/bin/behat

behat-full: db-test behat
