import React from 'react';

import TweetItem from './TweetItem';

export default class TweetList extends React.Component {
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
