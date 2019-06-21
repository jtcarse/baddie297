import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import icons from './typeIcons.js';
import TypeButton from './TypeButton.js';
import './TypeBox.css';

class TypeBox extends Component {
	toggleType(t) {
		this.props.toggleType(t);
	}

	render() {
		return (
			<div className="TypeBox">
				<Grid className="TypeGrid">
					{ Object.keys(icons).map(type =>
						<Grid.Column width={4} className="TypeColumn">
							<TypeButton
								type={type}
								icon={icons[type]}
								onClick={this.toggleType.bind(this)}
								active={this.props.types.includes(type)}
							/>
						</Grid.Column>
					)}
				</Grid>
			</div>
		);
	}
}

export default TypeBox;
