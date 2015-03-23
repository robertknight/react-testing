import React from 'react/addons';
import rewire from 'rewire';
import {expect} from 'chai';

import * as utils from './utils';

var TweetList = rewire('../src/TweetList');

import TweetItem from '../src/TweetItem';

const TEST_TWEETS = [{
	id: 'tweet-1',
	user: {
		screenName: 'robknight_',
		description: 'Robert Knight'
	},
	text: 'Hello tweet',
	createdAt: 'Mon Nov 29 21:18:15 +0000 2010'
},{
	id: 'tweet-2',
	user: {
		screenName: 'reactjs',
		description: 'React News'
	},
	text: 'Another test tweet',
	createdAt: 'Mon Nov 29 21:18:15 +0000 2010'
}];

class StubTweetItem extends React.Component {
	render() {
		return <div>stub tweet</div>;
	}
}

describe('TweetList', () => {
	beforeEach(() => {
		TweetList = rewire('../src/TweetList');
	});

	it('should display tweets (DOM class matching)', () => {
		const list = React.addons.TestUtils.renderIntoDocument(<TweetList tweets={TEST_TWEETS}/>);
		const items = React.findDOMNode(list).querySelectorAll('.tweet-item');
		expect(items.length).to.equal(TEST_TWEETS.length);
	});

	it('should display tweets (component type matching)', () => {
		const list = React.addons.TestUtils.renderIntoDocument(<TweetList tweets={TEST_TWEETS}/>);
		const items = React.addons.TestUtils.scryRenderedComponentsWithType(list, TweetItem);
		expect(items.length).to.equal(TEST_TWEETS.length);
	});

	it('should display tweets (stub component type matching)', () => {
		TweetList.__set__('TweetItem', StubTweetItem);

		utils.withContainer(element => {
			const list = React.render(
				<TweetList tweets={TEST_TWEETS}/>
			, element);
			const items = React.addons.TestUtils.scryRenderedComponentsWithType(list, StubTweetItem);

			// check that the correct number of tweets
			// were rendered
			expect(items.length).to.equal(TEST_TWEETS.length);

			// check that tweet items were rendered with the correct
			// props
			expect(items[0].props.subject).to.equal(TEST_TWEETS[0].subject);
			expect(items[0].props.from).to.equal(TEST_TWEETS[0].from);
			expect(items[0].props.snippet).to.equal(TEST_TWEETS[0].snippet);
		});
	});

	it('should display tweets (shallow rendering)', () => {
		const shallowRenderer = React.addons.TestUtils.createRenderer();
		const renderList = () => {
			shallowRenderer.render(<TweetList tweets={TEST_TWEETS}/>);
			const list = shallowRenderer.getRenderOutput();
			return list.props.children.filter(component => component.type == TweetItem);
		}
		const items = renderList();

		expect(items.length).to.equal(TEST_TWEETS.length);
	});

	it('should select tweet on click (stub component)', () => {
		TweetList.__set__('TweetItem', StubTweetItem);

		utils.withContainer(element => {
			const list = React.render(<TweetList tweets={TEST_TWEETS}/>, element);
			const items = React.addons.TestUtils.scryRenderedComponentsWithType(list, StubTweetItem);
			expect(items[0].props.isSelected).to.equal(false);

			items[0].props.onClick();
			expect(items[0].props.isSelected).to.equal(true);
		});
	});

	it('should select tweet on click (shallow rendering)', () => {
		const shallowRenderer = React.addons.TestUtils.createRenderer();
		const renderList = () => {
			shallowRenderer.render(<TweetList tweets={TEST_TWEETS}/>);
			const list = shallowRenderer.getRenderOutput();
			return list.props.children.filter(component => component.type == TweetItem);
		}
		let items = renderList();

		expect(items.length).to.equal(TEST_TWEETS.length);
		expect(items[0].props.isSelected).to.equal(false);
		items[0].props.onClick();

		items = renderList();
		expect(items[0].props.isSelected).to.equal(true);
	});
});

