dev-up:
	docker-compose -f docker-compose.dev.yml up --build --detach

dev-down:
	docker-compose -f docker-compose.dev.yml down

prod-up:
	docker-compose -f docker-compose.prod.yml up --build --detach

prod-down:
	docker-compose -f docker-compose.prod.yml down
