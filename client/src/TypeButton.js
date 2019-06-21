import React, { Component } from 'react';
import { Button, Image } from 'semantic-ui-react';
import './TypeButton.css';

class TypeButton extends Component {
	onClick() {
		this.props.onClick(this.props.type);
	}

	render() {
		return (
			this.props.active ?
			<Button className="TypeButton" onClick={this.onClick.bind(this)}>
				<Image src={this.props.icon} />
			</Button> :
			<Button className="TypeButton" onClick={this.onClick.bind(this)}>
				<Image className="inactive" src={this.props.icon} />
			</Button>
		);
	}
}

export default TypeButton;
