import React, { Component } from 'react';
import {} from 'semantic-ui-react';
import icons from './icons.js';
import AwakeningButton from './AwakeningButton.js';
import AwakeningList from './AwakeningList.js';
//import './App.css';

class AwakeningBox extends Component {
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

	componentDidMount() {/*
		fetch('http://localhost:8080')
			.then(response => response.json())
			.then(data => this.setState({ message: data.message }));
	*/}

	render() {
		return (
			<div className="AwakeningBox">
				{ Object.keys(icons).map(id =>
					<AwakeningButton
						id={id}
						icon={icons[id]}
						onClick={this.addAwakening.bind(this)}
					/>
				)}
				<br />
				<AwakeningList
					awakenings={this.state.awakenings}
					onItemClick={this.removeAwakening.bind(this)}
				/>
			</div>
		);
	}
}

export default AwakeningBox;
