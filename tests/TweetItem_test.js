import React from 'react';
import {renderIntoDocument} from 'react-addons-test-utils';

import {expect} from 'chai';

import setup from './setup';

import TweetItem from '../src/TweetItem';

// CommonJS syntax is used for importing rewire for compatibility
// with babel-loader.
//
// See https://github.com/jhnns/rewire-webpack/issues/12#issuecomment-95797024
// for an explanation
var rewire = require('rewire');

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
    const item = renderIntoDocument(
      <TweetItem tweet={tweet}/>
    );

    const userIcon = item.refs.userIcon;
    const userDescription = item.refs.userDescription;
    const userScreenName = item.refs.userScreenName;
    const date = item.refs.date;
    const text = item.refs.text;

    expect(userDescription.textContent).to.equal(tweet.user.description);
    expect(userScreenName.textContent).to.equal('@' + tweet.user.screenName);
    expect(date.textContent).to.include('3m');
    expect(text.textContent).to.equal(tweet.text);
  });
});
