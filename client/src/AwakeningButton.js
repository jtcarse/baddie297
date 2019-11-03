import React, { Component } from 'react';
import { Button, Image } from 'semantic-ui-react';
import './AwakeningButton.css';

class AwakeningButton extends Component {
    onClick() {
        this.props.onClick(this.props.id);
    }

    render() {
        return (
            <Button className="AwakeningButton" onClick={this.onClick.bind(this)}>
                <Image src={this.props.icon} />
            </Button>
        );
    }
}

export default AwakeningButton;
