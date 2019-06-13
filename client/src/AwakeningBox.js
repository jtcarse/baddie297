import React, { Component } from 'react';
import {} from 'semantic-ui-react';
import icons from './awakeningIcons.js';
import AwakeningButton from './AwakeningButton.js';
import AwakeningList from './AwakeningList.js';
//import './App.css';

class AwakeningBox extends Component {

	addAwakening(a) {
		this.props.addAwakening(a);
	}

	removeAwakening(i) {
		this.props.removeAwakening(i);
	}

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
					awakenings={this.props.awakenings}
					onItemClick={this.removeAwakening.bind(this)}
				/>
			</div>
		);
	}
}

export default AwakeningBox;
