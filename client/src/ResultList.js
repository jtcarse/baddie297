import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import Result from './Result.js';
//import './AwakeningList.css';

class ResultList extends Component {
	render() {
		return (
			<List className="ResultList">
				{
					this.props.results.length ?
						this.props.results.map(result =>
							<Result
								id={result._id}
								name={result.name}
								types={result.types}
								awakenings={result.awakenings}
							/>
						) :
						<List.Item>
							No results found.
						</List.Item>
				}
			</List>
		);
	}
}

export default ResultList;
