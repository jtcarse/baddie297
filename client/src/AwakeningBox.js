import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import icons from './awakeningIcons.js';
import AwakeningButton from './AwakeningButton.js';
import AwakeningList from './AwakeningList.js';
import './AwakeningBox.css';

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
                <Grid className="AwakeningGrid">
                    { Object.keys(icons).map(id =>
                        <Grid.Column mobile={2} tablet={2} computer={1} className="AwakeningColumn">
                            <AwakeningButton
                                id={id}
                                icon={icons[id]}
                                onClick={this.addAwakening.bind(this)}
                            />
                        </Grid.Column>
                    )}
                    <Grid.Column width={16} className="AwakeningColumn" textAlign='left'>
                        <AwakeningList
                            awakenings={this.props.awakenings}
                            onItemClick={this.removeAwakening.bind(this)}
                        />
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default AwakeningBox;
