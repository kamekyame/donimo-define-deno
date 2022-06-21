rm -rf ./test/coverage
rm ./test/coverage.lcov

deno task test $1
deno coverage ./test/coverage --lcov > ./test/coverage.lcov

rm -rf ./test/coverage-html
genhtml -o ./test/coverage-html ./test/coverage.lcov