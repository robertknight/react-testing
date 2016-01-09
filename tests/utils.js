import * as React from 'react';

export function withContainer(callback) {
	if (typeof document === 'undefined') {
		throw new Error('DOM environment has not been set up');
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

