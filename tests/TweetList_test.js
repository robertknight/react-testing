import React, {Component} from 'react';
import {findDOMNode, render} from 'react-dom';
import {createRenderer, scryRenderedComponentsWithType, renderIntoDocument} from 'react-addons-test-utils';
import {expect} from 'chai';

import * as utils from './utils';

import TweetItem from '../src/TweetItem';

var rewire = require('rewire');

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

class StubTweetItem extends Component {
  render() {
    return <div>stub tweet</div>;
  }
}

describe('TweetList', () => {
  var tweetListLib;
  var TweetList;

  beforeEach(() => {
    tweetListLib = rewire('../src/TweetList');
    TweetList = tweetListLib.default;
  });

  it('should display tweets (DOM class matching)', () => {
    const list = renderIntoDocument(<TweetList tweets={TEST_TWEETS}/>);
    const items = findDOMNode(list).querySelectorAll('.tweet-item');
    expect(items.length).to.equal(TEST_TWEETS.length);
  });

  it('should display tweets (component type matching)', () => {
    const list = renderIntoDocument(<TweetList tweets={TEST_TWEETS}/>);
    const items = scryRenderedComponentsWithType(list, TweetItem);
    expect(items.length).to.equal(TEST_TWEETS.length);
  });

  it('should display tweets (stub component type matching)', () => {
    tweetListLib.__set__('TweetItem', StubTweetItem);

    utils.withContainer(element => {
      const list = render(
        <TweetList tweets={TEST_TWEETS}/>
        , element);
        const items = scryRenderedComponentsWithType(list, StubTweetItem);

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
      const shallowRenderer = createRenderer();
      const renderList = () => {
        shallowRenderer.render(<TweetList tweets={TEST_TWEETS}/>);
        const list = shallowRenderer.getRenderOutput();
        return list.props.children.filter(component => component.type == TweetItem);
      }
      const items = renderList();

      expect(items.length).to.equal(TEST_TWEETS.length);
    });

    it('should select tweet on click (stub component)', () => {
      tweetListLib.__set__('TweetItem', StubTweetItem);

      utils.withContainer(element => {
        const list = render(<TweetList tweets={TEST_TWEETS}/>, element);
        const items = scryRenderedComponentsWithType(list, StubTweetItem);
        expect(items[0].props.isSelected).to.equal(false);

        items[0].props.onClick();
        expect(items[0].props.isSelected).to.equal(true);
      });
    });

    it('should select tweet on click (shallow rendering)', () => {
      const shallowRenderer = createRenderer();
      shallowRenderer.render(<TweetList tweets={TEST_TWEETS}/>);

      const getRenderedItems = () => {
        const list = shallowRenderer.getRenderOutput();
        return list.props.children.filter(component => component.type == TweetItem);
      }
      let items = getRenderedItems();

      expect(items.length).to.equal(TEST_TWEETS.length);
      expect(items[0].props.isSelected).to.equal(false);
      items[0].props.onClick();

      items = getRenderedItems();
      expect(items[0].props.isSelected).to.equal(true);
    });
  });
