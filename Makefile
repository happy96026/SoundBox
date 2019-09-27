dev:
	docker-compose -f docker-compose.dev.yml up --detach
down:
	docker-compose -f docker-compose.dev.yml down
