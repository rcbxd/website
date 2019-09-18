start-services:
	docker-compose up -d

build-services:
	docker-compose build

stop-services:
	docker-compose down

start-db:
	brew services start mysql

restart-db:
	brew services restart mysql

stop-db:
	brew services stop mysql