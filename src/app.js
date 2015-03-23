import {Flux} from 'flummox';
import React from 'react';

import FeedActions from './FeedActions';
import StatusView from './StatusView';
import TweetListContainer from './TweetListContainer';
import TweetStore from './TweetStore';

class AppFlux extends Flux {
	constructor() {
		super();

		this.createActions('tweets', FeedActions);
		this.createStore('tweets', TweetStore, this);
	}

	fetchInitialData() {
		this.getActions('tweets').fetchTimeline();
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedTweet: null
		};
	}

	render() {
		return <div className="app">
			<div className="app-center-column">
				<StatusView flux={this.props.flux} />
				<TweetListContainer flux={this.props.flux} onSelect={tweet =>
					this.setState({selectedTweet: tweet})
				}/>
			</div>
		</div>
	}
}

var flux = new AppFlux();
flux.fetchInitialData();
flux.addListener('dispatch', action => {
	console.log('dispatching', action.actionId);
});

var content = document.getElementById('app');
React.render(<App flux={flux}/>, content);
