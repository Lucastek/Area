include .env

RM 		= 	rm -rf

BLUE 		= 	\033[36m

WHITE 		= 	\033[0m

API_DIR 	= 	api-area
FRONT_DIR 	= 	front-area
DESKTOP_DIR 	= 	front-desktop

API_DOCKER_TAG 		= 	whispr/api-area:${APP_VERSION}
FRONT_DOCKER_TAG 	= 	whispr/front-area:${APP_VERSION}

all:
	@echo "Refers to 'help' rule for more infos."

run-docker: ## create and start area container
	@docker-compose up

down-docker: ## Stop and Remove area container
	@docker-compose down

run-docker-api: ## Create and start api-area container
	@docker build $(API_DIR) -t $(API_DOCKER_TAG)
	@docker run -p 0.0.0.0:8080:8080 -t $(API_DOCKER_TAG) 

run-docker-front: ## Create and start front-area container
	@docker build $(FRONT_DIR) -t $(FRONT_DOCKER_TAG)
	@docker run -p 0.0.0.0:3000:3000 -t $(FRONT_DOCKER_TAG) 

build-desktop: ##  Build desktop application
	@npm --prefix $(DESKTOP_DIR) start 

run-desktop: ##  Build and run desktop application wherever it's situated
	@npm --prefix $(DESKTOP_DIR) start && eval "$$(find -name 'area-desktop')" & disown

launch-desktop: ##  Run desktop application wherever it's situated
	@eval "$$(find -name 'area-desktop')" & disown

run-api: ## Build and run the area api
	@npm --prefix $(API_DIR) run build
	@node $(API_DIR)/dist/src/server.js

run-front: ## Build and run the area front
	@npm --prefix $(FRONT_DIR) start

clean-api: ## Use clean command: remove dist directory
	@npm --prefix $(API_DIR) run clean

help: ## Display this help
	@printf "USAGE:\n\n"
	@grep -E "^[a-zA-Z\\-]+:.*##.*" Makefile | awk -F ":.*## " '{printf "$(BLUE)%-25s$(WHITE)%s\n", $$1, $$2}' | sort
