import React, { Component, createRef } from 'react';
import { Button, Grid, Segment, Pagination } from 'semantic-ui-react';
import axios from 'axios';

import AwakeningBox from './AwakeningBox.js';
import TypeBox from './TypeBox.js';
import ElementBox from './ElementBox.js';
import LogicBox from './LogicBox.js';
import ResultList from './ResultList.js';
//import PageList from './PageList.js';

import './SearchBox.css';

class SearchBox extends Component {
    state = {
        awakenings: [],
        types: [],
        typeLogic: 'and',
        elements: [],
        elementLogic: 'and',
        results: [],
        activePage: 0,
        totalPages: 0
    };

    contextRef = createRef();

    addAwakening(a) {
        this.setState({
            awakenings: this.state.awakenings.concat([a])
        });
    }

    removeAwakening(i) {
        let a = this.state.awakenings;
        a.splice(i, 1);
        this.setState({
            awakenings: a
        });
    }

    toggleType(t) {
        let { types } = this.state;

        if (types.includes(t)) {
            types = types.filter(type => type !== t);
        } else {
            types.push(t);
        }

        this.setState({
            types: types
        });
    }

    toggleTypeLogic() {
        const { typeLogic } = this.state;
        let newLogic;

        if (typeLogic === 'and') {
            newLogic = 'or';
        } else {
            newLogic = 'and';
        }

        this.setState({
            typeLogic: newLogic
        });
    }

    toggleElementLogic() {
        const { elementLogic } = this.state;
        let newLogic;

        if (elementLogic === 'and') {
            newLogic = 'or';
        } else {
            newLogic = 'and';
        }

        this.setState({
            elementLogic: newLogic
        });
    }

    toggleElement(e) {
        let { elements } = this.state;

        if (elements.includes(e)) {
            elements = elements.filter(element => element !== e);
        } else {
            elements.push(e);
        }

        this.setState({
            elements: elements
        });
    }

    handlePageChange(e, { activePage }) {
        this.setPage(activePage);
    }

    setPage(page) {
        this.setState(
            { activePage: page },
            () => this.search()
        );
    }

    search() {
        let url = 'api/monsters?';
        let queryArgs = [];

        if (this.state.awakenings.length) {
            queryArgs.push('awakenings=' + this.state.awakenings.join());
        }

        if (this.state.types.length) {
            queryArgs.push('types=' + this.state.types.join());
            queryArgs.push('type_logic=' + this.state.typeLogic);
        }

        if (this.state.elements.length) {
            queryArgs.push('elements=' + this.state.elements.join());
            queryArgs.push('element_logic=' + this.state.elementLogic);
        }

        // decrement activePage to obtain 0 indexing for back-end interaction
        queryArgs.push('page=' + (this.state.activePage - 1));

        url += queryArgs.join('&');

        axios.get(url)
            .then(response => response.data)
            .then(data => {
                this.setState({
                    totalPages: data.totalPages,
                    results: data.data
                });
            });

    }

    render() {
        return (
            <div className="SearchBox">
                <Grid className="SearchGrid">
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                        <Grid>
                            <Grid.Row stretched>
                                <Grid.Column width={5}>
                                    <Segment basic className="SearchSegment">
                                        <TypeBox
                                            types={this.state.types}
                                            toggleType={this.toggleType.bind(this)}
                                        />
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column width={11}>
                                    <Segment basic className="SearchSegment">
                                        <ElementBox
                                            elements={this.state.elements}
                                            toggleElement={this.toggleElement.bind(this)}
                                        />
                                    </Segment>
                                    <Segment basic className="SearchSegment">
                                        <LogicBox
                                            typeLogic={this.state.typeLogic}
                                            elementLogic={this.state.elementLogic}
                                            toggleTypeLogic={this.toggleTypeLogic.bind(this)}
                                            toggleElementLogic={this.toggleElementLogic.bind(this)}
                                        />
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <br />
                        <AwakeningBox
                            awakenings={this.state.awakenings}
                            addAwakening={this.addAwakening.bind(this)}
                            removeAwakening={this.removeAwakening.bind(this)}
                        />
                        <br />
                        <Button onClick={() => this.setPage(1)}>Search</Button>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                        <ResultList results={this.state.results} />
                        {
                            this.state.totalPages ?
                                <Pagination secondary pointing
                                    onPageChange={this.handlePageChange.bind(this)}
                                    activePage={this.state.activePage}
                                    totalPages={this.state.totalPages}
                                />
                            : null
                        }
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default SearchBox;
