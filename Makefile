all: help

.PHONY: help
help:
	@echo 'Available targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@printf '\nAvailable variables:\n'
	@grep -E '^[a-zA-Z_-]+\?=.*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = "?="}; {printf "\033[36m%-20s\033[0m default: %s\n", $$1, $$2}'

.PHONY: down
down: ## Remove the local environment
	docker-compose down

.PHONY: reset
reset: down test ## Reset the local environment

.PHONY: setup
setup: ## Install project dependencies
	docker-compose run --rm app npm install

.PHONY: sh
sh: ## Open a shell on app container
	docker-compose exec app sh

.PHONY: test
test: ## Run test suite
	docker-compose up -d
	sleep 1 && docker-compose exec app scripts/wait_elastic
	docker-compose exec app npm test

.PHONY: test-fast
test-fast: ## Run test suite without starting docker-compose before
	docker-compose exec app npm test
