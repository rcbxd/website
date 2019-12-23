#works only for my mac configuration with brew installed

start-db:
	brew services start mysql

restart-db:
	brew services restart mysql

stop-db:
	brew services stop mysql

runserver:
	node server.js

run-user:
	node server.js --testuser