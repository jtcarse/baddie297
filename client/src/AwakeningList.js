import React, { Component } from 'react';
import { Image, List } from 'semantic-ui-react';
import icons from './awakeningIcons.js';
//import './App.css';

class AwakeningList extends Component {
	onItemClick(i) {
		this.props.onItemClick(i);
	}

	render() {
		return (
			<List horizontal>
				{ this.props.awakenings.map((id, index) =>
					<List.Item onClick={this.onItemClick.bind(this, index)}>
						<Image src={icons[id]} />
					</List.Item>
				)}
			</List>
		);
	}
}

export default AwakeningList;
