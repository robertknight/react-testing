var React = require("react");

export function withContainer(callback) {
	if (typeof document === 'undefined') {
		throw new Error('DOM environment has not been set up');
	}

	// React checks whether the DOM is available when first required.
	// Make sure that the document/window global objects were set up
	// before React was loaded
        var ReactDOM = require('react-dom');
        var ExecutionEnvironment = require('exenv');
	if (!ExecutionEnvironment.canUseDOM) {
		throw new Error('document or window was not set up when React detected its environment');
	}

	let appElement = document.getElementById('app');
	if (!appElement) {
		appElement = document.createElement('div');
		appElement.id = 'app';
		document.body.appendChild(appElement);
	}

	appElement.innerHTML = '';
	callback(appElement);
	ReactDOM.unmountComponentAtNode(appElement);
}

