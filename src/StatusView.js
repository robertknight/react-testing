import classNames from 'classnames';
import React, {Component} from 'react';

export default class StatusView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			refreshing: false
		};
	}

	render() {
		const feedActions = this.props.flux.getActions('tweets');
		const fetchTimeline = () => {
			this.setState({refreshing: true});
			feedActions.fetchTimeline().then(() => {
				this.setState({refreshing: false});
			});
		};

		return <div className="status-view">
			<img ref="spinner" className={classNames({
				'status-view-refresh-icon': true,
				'spin-element': this.state.refreshing
			})} src="assets/ic_refresh_24px.svg" onClick={fetchTimeline}/>
		</div>;
	}
}
