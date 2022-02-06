rm -rf ./test/coverage
rm -rf ./test/coverage-html
rm ./test/coverage.lcov

deno test -A --coverage=./test/coverage $1
deno coverage ./test/coverage --lcov > ./test/coverage.lcov
genhtml -o ./test/coverage-html ./test/coverage.lcov