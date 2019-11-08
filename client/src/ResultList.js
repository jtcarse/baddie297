import React, { Component } from 'react';
import { List } from 'semantic-ui-react';

import Result from './Result.js';
import './ResultList.css';

class ResultList extends Component {
    setPage(page) {
        this.props.setPage(page);
    }

    render() {
        return (
            <List className="ResultList">
            {
                this.props.results.length ?
                    this.props.results.map((result, index) =>
                        <Result
                            key={index}
                            id={result._id}
                            name={result.name}
                            types={result.types}
                            awakenings={result.awakenings}
                            super_awakenings={result.super_awakenings}
                        />
                    ) :
                    <List.Item>
                        <br />
                        No results found.
                    </List.Item>
            }
            </List>
        );
    }
}

export default ResultList;
