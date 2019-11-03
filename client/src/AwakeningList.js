import React, { Component } from 'react';
import { Image, List } from 'semantic-ui-react';
import icons from './awakeningIcons.js';
import placeholder from './icons/awakenings/0.png';
import './AwakeningList.css';

class AwakeningList extends Component {
    onItemClick(i) {
        this.props.onItemClick(i);
    }

    render() {
        return (
            <div className="AwakeningList">
                <List horizontal>
                {
                    this.props.awakenings.length ?
                        this.props.awakenings.map((id, index) =>
                        <List.Item key={index} onClick={this.onItemClick.bind(this, index)}>
                            <Image src={icons[id]} />
                        </List.Item>
                        ) :
                        <List.Item key={0}>
                            <Image src={placeholder} />
                        </List.Item>
                }
                </List>
            </div>
        );
    }
}

export default AwakeningList;
