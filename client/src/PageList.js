import React, { Component } from 'react';
import { Pagination } from 'semantic-ui-react';

class PageList extends Component {
    onPageChange(e, { page }) {
        this.props.onPageChange(page);
    }

    render() {
        return (
            <Pagination
                activePage={this.props.currentPage}
                totalPages={this.props.totalPages}
                onPageChange={this.onPageChange}
            />
            {/*
                [...Array(this.props.totalPages).keys()].map((page, index) =>
                    <List.Item onClick={this.onItemClick.bind(this, page)}>
                        {page}
                    </List.Item>
                )
            */}
        );
    }
}

export default PageList;
