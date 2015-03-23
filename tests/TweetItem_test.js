import React from 'react/addons';

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
		const tweet = TEST_TWEET;
		const item = React.addons.TestUtils.renderIntoDocument(
			<TweetItem tweet={tweet}/>
		);

		const userIcon = React.findDOMNode(item.refs.userIcon);
		const userDescription = React.findDOMNode(item.refs.userDescription);
		const userScreenName = React.findDOMNode(item.refs.userScreenName);
		const date = React.findDOMNode(item.refs.date);
		const text = React.findDOMNode(item.refs.text);

		expect(userDescription.textContent).to.equal(tweet.user.description);
		expect(userScreenName.textContent).to.equal('@' + tweet.user.screenName);
		expect(date.textContent).to.include('3m');
		expect(text.textContent).to.equal(tweet.text);
	});
});
