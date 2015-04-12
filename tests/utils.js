import React from 'react';

export function withContainer(callback) {
	if (typeof document === 'undefined') {
		throw new Error('DOM environment has not been set up');
	}

	// React checks whether the DOM is available when first required.
	// Make sure that the document/window global objects were set up
	// before React was loaded
	var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');
	if (!ExecutionEnvironment.canUseDOM) {
		throw new Error('document or window was not set up when React detected its environment');
	}

	var React = require('react');

	let appElement = document.getElementById('app');
	if (!appElement) {
		appElement = document.createElement('div');
		appElement.id = 'app';
		document.body.appendChild(appElement);
	}

	appElement.innerHTML = '';
	callback(appElement);
	React.unmountComponentAtNode(appElement);
}

