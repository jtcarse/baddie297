import React, { Component } from 'react';
import { Checkbox, Grid, Label } from 'semantic-ui-react';
import './LogicBox.css';

class LogicBox extends Component {
    toggleTypeLogic() {
        this.props.toggleTypeLogic();
    }

    toggleElementLogic() {
        this.props.toggleElementLogic();
    }

    render() {
        return (
            <div className="LogicBox">
                <Grid className="LogicGrid">
                    <Grid.Column className="LogicColumn" width={8}>
                        <p>Types</p>
                        <Checkbox toggle
                            className="LogicCheckbox"
                            label=<Label>{this.props.typeLogic.toUpperCase()}</Label>
                            onChange={this.toggleTypeLogic.bind(this)}
                        />
                    </Grid.Column>
                    <Grid.Column className="LogicColumn" width={8}>
                        <p>Elements</p>
                        <Checkbox toggle
                            className="LogicCheckbox"
                            label=<Label>{this.props.elementLogic.toUpperCase()}</Label>
                            onChange={this.toggleElementLogic.bind(this)}
                        />
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default LogicBox;
