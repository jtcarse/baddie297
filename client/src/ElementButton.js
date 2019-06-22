import React, { Component } from 'react';
import { Button, Image } from 'semantic-ui-react';
import './ElementButton.css';

class ElementButton extends Component {
	onClick() {
		this.props.onClick(this.props.element);
	}

	render() {
		return (
			this.props.active ?
			<Button className="ElementButton" onClick={this.onClick.bind(this)}>
				<Image src={this.props.icon} />
			</Button> :
			<Button className="ElementButton" onClick={this.onClick.bind(this)}>
				<Image className="inactive" src={this.props.icon} />
			</Button>
		);
	}
}

export default ElementButton;
