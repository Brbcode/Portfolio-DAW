up:
	docker compose up -d

down:
	docker compose down

rebuild:
	docker compose down -v --remove-orphans
	docker compose rm -vsf
	docker compose up -d --build

shell:
	docker compose exec -it php sh

watch:
	docker compose exec php yarn run encore dev --watch

db:
	docker compose exec php ./bin/console doctrine:database:drop --if-exist --force
	docker compose exec php ./bin/console doctrine:database:create
	docker compose exec php ./bin/console doctrine:migrations:migrate -n

