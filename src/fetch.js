// wrapper around browser and Node-specific polyfills
// for the fetch() API

if (process.browser) {
	require('whatwg-fetch');
	module.exports = self.fetch;
} else {
	module.exports = require('node-fetch');
}

