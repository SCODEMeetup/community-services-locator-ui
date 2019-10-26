install:
	docker volume create nodemodules
	docker-compose -f docker-compose.builder.yml run --rm install
	docker-compose up