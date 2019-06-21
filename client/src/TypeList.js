import React, { Component } from 'react';
import { Image, List } from 'semantic-ui-react';
import icons from './typeIcons.js';
import placeholder from './icons/types/Placeholder.png';
import './TypeList.css';

class TypeList extends Component {
	onItemClick(i) {
		this.props.onItemClick(i);
	}

	render() {
		return (
			<div className="TypeList">
				<List horizontal>
					{
						this.props.types.length ?
							this.props.types.map((type, index) =>
							<List.Item onClick={this.onItemClick.bind(this, index)}>
								<Image src={icons[type]} />
							</List.Item>
							) :
							<List.Item>
								<Image src={placeholder} />
							</List.Item>
					}
				</List>
			</div>
		);
	}
}

export default TypeList;
