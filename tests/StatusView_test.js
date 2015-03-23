import {Actions, Flux} from 'flummox';
import {expect} from 'chai';
import Q from 'q';
import React from 'react/addons';

import StatusView from '../src/StatusView';
import * as utils from './utils';

class FakeTweetActions extends Actions {
	fetchTimeline() {
		return Q({});
	}
}

class FakeFlux extends Flux {
	constructor() {
		super();
		this.createActions('tweets', FakeTweetActions);
	}
}

describe('StatusView', () => {
	it('should trigger refresh on click', () => {
		let fetchCount = 0;
		let fetchComplete = Q.defer();

		// setup a fake flux instance which provides the actions
		// that the refresh button should trigger but nothing more
		const flux = new FakeFlux();
		flux.addListener('dispatch', action => {
			const fetchTimelineId = flux.getActionIds('tweets').fetchTimeline;
			if (action.actionId === fetchTimelineId) {
				if (action.async === 'begin') {
					++fetchCount;
				} else if (action.async === 'success') {
					fetchComplete.resolve(true);
				} else {
					fetchComplete.reject();
				}
			}
		});

		const statusView = React.addons.TestUtils.renderIntoDocument(
			<StatusView flux={flux}/>
		);
		const refreshButton = statusView.refs.spinner;

		// check that the status view shows the refresh indicator when
		// clicked, and stops the indicator once the refresh completes
		expect(fetchCount).to.equal(0);
		React.addons.TestUtils.Simulate.click(refreshButton);
		expect(fetchCount).to.equal(1);
		expect(statusView.state.refreshing).to.equal(true);

		return fetchComplete.promise.then(() => {
			expect(statusView.state.refreshing).to.equal(false);
		});
	});
});

