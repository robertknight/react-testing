import React from 'react';

import TweetList from './TweetList';
import TweetStore from './TweetStore';

/** A wrapper around TweetList which handles data fetching
 * for that component.
 */
export default class TweetListContainer extends React.Component {
	constructor(props) {
		super(props);

		this.tweetStore = props.flux.getStore('tweets');
		this.state = {
			tweets: this.tweetStore.getTweets()
		};
	}

	componentDidMount() {
		// in a typical app using flummox, the FluxComponent wrapper
		// which ships with the library would be used instead of manually
		// setting up a store change listener, subscribing to updates
		// and removing the listener on unmount.
		//
		// It is done here for exposition
		this.feedUpdateListener = () => {
			this.getTweets();
		};
		this.tweetStore.addListener('change', this.feedUpdateListener);
	}

	componentWillUnmount() {
		this.tweetStore.removeListener('change', this.feedUpdateListener);
	}

	getTweets() {
		this.setState({tweets: this.tweetStore.getTweets()});
	}

	render() {
		return <TweetList tweets={this.state.tweets} onSelect={tweet =>
			this.setState({selectedTweet: tweet})
		}/>
	}
}

