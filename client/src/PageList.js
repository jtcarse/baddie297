import React, { Component } from 'react';
import { List, Button } from 'semantic-ui-react';

class PageList extends Component {
    onItemClick(page) {
        this.props.onItemClick(page);
    }

    render() {
        return (
            <List horizontal>
            {
                [...Array(this.props.totalPages).keys()].map((page, index) =>
                    <List.Item onClick={this.onItemClick.bind(this, page)}>
                        {page}
                    </List.Item>
                )
            }
            </List>
        );
    }
}

export default PageList;
