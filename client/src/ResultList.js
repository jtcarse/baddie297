import React, { Component } from 'react';
import { Image, List } from 'semantic-ui-react';
import icons from './awakeningIcons.js';
import placeholder from './icons/awakenings/0.png';
import Result from './Result.js';
//import './AwakeningList.css';

class ResultList extends Component {
	render() {
		return (
			<div className="ResultList">
				<List>
					{
						this.props.results.length ?
							this.props.results.map(result =>
								<Result
									name={result.name}
									awakenings={result.awakenings}
								/>
							) :
							<List.Item>
								No results found.
							</List.Item>
					}
				</List>
			</div>
		);
	}
}

export default ResultList;
