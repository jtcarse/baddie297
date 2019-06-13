import React, { Component } from 'react';
import {} from 'semantic-ui-react';
import AwakeningBox from './AwakeningBox.js';
//import './App.css';

class SearchBox extends Component {
	state = {
		awakenings: []
	};

	addAwakening(a) {
		this.setState({
			awakenings: this.state.awakenings.concat([a])
		});
	}

	removeAwakening(i) {
		let a = this.state.awakenings;
		a.splice(i, 1);
		this.setState({
			awakenings: a
		});
	}

	render() {
		return (
			<div className="SearchBox">
				<AwakeningBox
					awakenings={this.state.awakenings}
					addAwakening={this.addAwakening.bind(this)}
					removeAwakening={this.removeAwakening.bind(this)}
				/>
			</div>
		);
	}
}

export default SearchBox;
