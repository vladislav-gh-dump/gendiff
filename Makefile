install: install-deps
	npx simple-git-hooks

install-deps:
	npm ci

lint:
	npx eslint .

publish:
	npm publish --dry-run

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

.PHONY: test
