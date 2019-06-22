import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import icons from './elementIcons.js';
import ElementButton from './ElementButton.js';
import './ElementBox.css';

class ElementBox extends Component {
	toggleElement(e) {
		this.props.toggleElement(e);
	}

	render() {
		return (
			<div className="ElementBox">
				<Grid className="ElementGrid">
					{ Object.keys(icons).map(element =>
						<Grid.Column width={3} className="ElementColumn">
							<ElementButton
								element={element}
								icon={icons[element]}
								onClick={this.toggleElement.bind(this)}
								active={this.props.elements.includes(element)}
							/>
						</Grid.Column>
					)}
				</Grid>
			</div>
		);
	}
}

export default ElementBox;
