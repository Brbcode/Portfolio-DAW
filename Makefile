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

watch:
	docker compose exec fpm yarn run encore dev --watch

db:
	docker compose exec fpm ./bin/console doctrine:database:drop --if-exist --force
	docker compose exec fpm ./bin/console doctrine:database:create
	docker compose exec fpm ./bin/console doctrine:migrations:migrate -n

