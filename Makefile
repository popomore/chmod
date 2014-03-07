test:
	./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha -- -R spec

coveralls: test
	cat ./coverage/lcov.info | ./node_modules/.bin/coveralls

.PHONY: test
