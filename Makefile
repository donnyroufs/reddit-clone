prepare:
	yarn
	cd projects/DAL && yarn build
	cd projects/BLL && yarn build
	cd projects/API && yarn build

app-be:
	$(MAKE) prepare
	docker-compose up -d
	sleep 1
	yarn dev

app-fe:
	cd projects/UI && yarn dev

app:
	$(MAKE) app-be
	# $(MAKE) xterm app-frontend
	