// this handles setup of the fake DOM when the tests are
// run in Node

var jsdom = require('jsdom');

function setupFakeDOM() {
	if (typeof document !== 'undefined') {
		// if the fake DOM has already been set up, or
		// if running in a real browser, do nothing
		return;
	}

	// setup the fake DOM environment.
	var FAKE_DOM_HTML = '<!doctype html><html><body></body></html>';
	// Note that we use the synchronous jsdom.jsdom() API
	// instead of jsdom.env() because the 'document' and 'window'
	// objects must be available when React is require()-d for
	// the first time.
	//
	// If you want to do any async setup in your tests, use
	// the before() and beforeEach() hooks.
        var init = function() {   
            global.document = jsdom.jsdom(FAKE_DOM_HTML);
            global.window = document.defaultView;
            global.navigator = window.navigator;
        }

        // from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
        function propagateToGlobal (window) {
            for (let key in window) {
                if (!window.hasOwnProperty(key)) continue
                    if (key in global) continue

                        global[key] = window[key]
            }
        }

        init();
        propagateToGlobal(global.window);

}

setupFakeDOM();

