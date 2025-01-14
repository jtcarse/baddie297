import React, { Component } from 'react';
import { Grid, Image, List, Loader, Segment } from 'semantic-ui-react';
import awakeningIcons from './awakeningIcons.js';
import placeholder from './icons/awakenings/0.png';
import typeIcons from './typeIcons.js';
import './Result.css';

class Result extends Component {
    state = {};

    getIcon() {
        import(`./icons/monsters/${this.props.id}.png`)
            .then(result => this.setState({
                iconUrl: result.default
            }));
    }

    getAwakenings() {
        let awakenings = [];
        if (Object.keys(this.props.awakenings).length) {
            Object.keys(this.props.awakenings).forEach(a => {
                for (let i = 0; i < this.props.awakenings[a]; i++) {
                    awakenings.push(a);
                }
            });
        }

        this.setState({
            awakenings: awakenings
        });
    }

    getSuperAwakenings() {
        this.setState({
            super_awakenings: this.props.super_awakenings
        });
    }

    getTypes() {
        this.setState({
            types: this.props.types
        });
    }

    componentDidMount() {
        this.getIcon();
        this.getAwakenings();
        this.getSuperAwakenings();
        this.getTypes();
    }

    componentDidUpdate(oldProps) {
        if (this.props.id !== oldProps.id) {
            this.getIcon();
            this.getAwakenings();
            this.getSuperAwakenings();
            this.getTypes();
        }
    }

    render() {
        return (
            <List.Item className="ResultListItem">
                <div className="Result">
                    <Grid>
                        <Grid.Row stretched>
                            <Grid.Column className="IconColumn" width={4}>
                                <Segment basic className="LeftSegment">
                                    {
                                        this.state.iconUrl ?
                                        <Image as="a"
                                            className="MonsterIcon"
                                            src={this.state.iconUrl}
                                            target="_blank"
                                            href={"http://www.puzzledragonx.com/en/monster.asp?n=" + this.props.id}/> :
                                        <Loader active/>
                                    }
                                </Segment>
                                <Segment basic className="LeftSegment">
                                    <List horizontal className="TypeList">
                                    {
                                        this.state.types ?
                                        this.state.types.map(t =>
                                            <List.Item className="TypeItem">
                                                <Image className="TypeIcon" src={typeIcons[t]}/>
                                            </List.Item>
                                        ) :
                                        <List.Item className="TypeItem"><Image src={placeholder}/></List.Item>
                                    }
                                    </List>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width={12}>
                                <Segment basic className="RightSegment">
                                    <div className="NameItem">
                                        <div verticalAlign="middle" className="ResultName">{this.props.name}</div>
                                    </div>
                                </Segment>
                                <Segment basic className="RightSegment">
                                    <List horizontal>
                                    {
                                        this.state.awakenings ?
                                        this.state.awakenings.map(id =>
                                            <List.Item className="AwakeningItem">
                                                <Image className="AwakeningIcon" src={awakeningIcons[id]}/>
                                            </List.Item>
                                        ) :
                                        <List.Item className="ResultItem"><Image src={placeholder}/></List.Item>
                                    }
                                    </List>
                                </Segment>
                                <Segment basic className="RightSegment">
                                    <List horizontal>
                                    {
                                        this.state.super_awakenings ?
                                        this.state.super_awakenings.map(id =>
                                            <List.Item className="ResultItem">
                                                <Image className="AwakeningIcon" src={awakeningIcons[id]}/>
                                            </List.Item>
                                        ) :
                                        <List.Item className="ResultItem"><Image src={placeholder}/></List.Item>
                                    }
                                    </List>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </List.Item>
        );
    }
}

export default Result;
