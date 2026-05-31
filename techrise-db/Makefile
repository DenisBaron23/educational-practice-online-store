# Makefile
db-up:
	docker-compose up -d db

db-shell:
	docker exec -it $$(docker-compose ps -q db) psql -U admin -d techrise

db-down:
	docker-compose down