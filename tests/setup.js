// this handles setup of the fake DOM when the tests are
// run in Node

import jsdom from 'jsdom';

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
		return;
	}

	// setup the fake DOM environment.
	//
	// Note that we use the synchronous jsdom.jsdom() API
	// instead of jsdom.env() because the 'document' and 'window'
	// objects must be available when React is require()-d for
	// the first time.
	//
	// If you want to do any async setup in your tests, use
	// the before() and beforeEach() hooks.
	global.document = jsdom.jsdom(FAKE_DOM_HTML);
	global.window = document.defaultView;
	global.navigator = window.navigator;
}

setupFakeDOM();

