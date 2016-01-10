import React, {Component} from 'react';

// Imports that are going to be stubbed need to use CommonJS style
// imports rather than ES6-style imports. This is because rewire works
// by changing the value of top-level variables within a module and
// the names of variables generated when Babel converts 'import foo from "bar"'
// to ES5 is not defined.
//
// In future, it should be possible to use
// https://github.com/speedskater/babel-plugin-rewire instead of rewire, once
// compatibility issues with Babel 6 are resolved, see
// https://github.com/speedskater/babel-plugin-rewire/issues/71
var TweetItem = require('./TweetItem').default;

export default class TweetList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedtweet: null
    };
  }

  render() {
    return <div className="tweet-list">
    {this.props.tweets.map(tweet =>
      <TweetItem
        key={tweet.id}
        tweet={tweet}
        isSelected={tweet === this.state.selectedTweet}

        onClick={() => this.setState({selectedTweet: tweet})}
      />
    )}
    </div>
  }
}
