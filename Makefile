install:
	npm ci

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

test-coverage:
	npx vitest run --coverage