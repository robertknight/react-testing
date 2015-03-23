// this is the entry point for the test suite for use in
// webpack
const testModules = [
	'./TweetItem_test',
	'./TweetList_test'
];

testModules.forEach(testModule => require(testModule));
