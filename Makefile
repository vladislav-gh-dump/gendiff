lint:
	npx eslint .

publish:
	npm publish --dry-run

install: install-deps
	npx simple-git-hooks
