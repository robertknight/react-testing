var React = require("react");
var ReactTestUtils = require('react-addons-test-utils');

import {expect} from 'chai';
import rewire from 'rewire';

import setup from './setup';

const TweetItem = rewire('../src/TweetItem');

const TEST_TWEET = {
	id: 'tweet-1',
	user: {
		screenName: 'robknight_',
		description: 'Robert Knight'
	},
	text: 'Hello tweet',
	createdAt: new Date(Date.now() - 180.0 * 1000)
};

describe('TweetItem', () => {
	it('should display item details', () => {
                var ReactDOM = require('react-dom');
		const tweet = TEST_TWEET;
		const item = ReactTestUtils.renderIntoDocument(
			<TweetItem tweet={tweet}/>
		);

		const userIcon = ReactDOM.findDOMNode(item.refs.userIcon);
		const userDescription = ReactDOM.findDOMNode(item.refs.userDescription);
		const userScreenName = ReactDOM.findDOMNode(item.refs.userScreenName);
		const date = ReactDOM.findDOMNode(item.refs.date);
		const text = ReactDOM.findDOMNode(item.refs.text);

		expect(userDescription.textContent).to.equal(tweet.user.description);
		expect(userScreenName.textContent).to.equal('@' + tweet.user.screenName);
		expect(date.textContent).to.include('3m');
		expect(text.textContent).to.equal(tweet.text);
	});
});
