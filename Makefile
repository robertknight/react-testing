MOCHA_ARGS=--compilers js:babel-core/register --require tests/setup.js
TEST_FILES=$(wildcard tests/*.js)

test:
	@mocha $(MOCHA_ARGS) $(TEST_FILES)

test-watch:
	@mocha $(MOCHA_ARGS) --watch $(TEST_FILES)
