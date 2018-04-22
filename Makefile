# import deploy config
config ?= config.env
include $(config)
export $(shell sed 's/=.*//' $(config))

# HELP
# This will output the help for each task
# thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help

help: ## This help.
	@echo "Target 'make all' will do everything needed for deploy"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

# Build the container
build: ## Build the container
	@echo
	@echo "----- Building Container -----"
	@echo
	@export DOCKER_NAME=$(APP_NAME)
	docker build -t $(APP_NAME) .
	@echo
	@echo "----- Container Built -----"
	@echo

build-nc: ## Build the container without caching
	@echo
	@echo "----- Building Container No Cache -----"
	@echo
	docker build --no-cache -t $(APP_NAME) .
	@echo
	@echo "----- Container Built -----"
	@echo

stop: ## Stop and remove a running container
	@echo
	@echo "----- Stopping $(APP_NAME) container -----"
	@echo

	@docker stop $(APP_NAME) > /dev/null
	@echo "$(APP_NAME) container stopped"
	@docker rm $(APP_NAME) > /dev/null
	@echo "$(APP_NAME) container removed"
	@docker rmi $(APP_NAME) > /dev/null
	@echo "$(APP_NAME) image removed"

	@echo
	@echo "----- Container Stopped -----"
	@echo

clean: stop ## Alias for stop, no extra files are made that are needed to remove

run: ## Run the docker container
	@echo
	@echo "----- Starting Container -----"
	@echo
	@docker run -it --name="$(APP_NAME)" $(APP_NAME) bash
	@echo
	@echo "----- Stopped -----"
	@echo

all: build-nc run ## Build and run the application for linux

test: ##Manually run the tests inside of the docker container
	docker exec $(APP_NAME) python setup.py "test"
