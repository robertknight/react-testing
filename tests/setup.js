// this handles setup of the fake DOM when the tests are
// run in Node

import jsdom from 'jsdom';
import Q from 'q';

var FAKE_DOM_HTML = `
<html>
<body>
</body>
</html>
`;

function setupFakeDOM() {
	if (typeof document !== 'undefined') {
		// if the fake DOM has already been set up, or
		// if running in a real browser, do nothing
		return Q();
	}

	var ready = Q.defer();
	jsdom.env({
		html: FAKE_DOM_HTML,
		done: (errors, window) => {
			global.document = window.document;
			global.window = window;
			global.navigator = window.navigator;

			ready.resolve(window);
		}
	});
	return ready.promise;
}

setupFakeDOM();

