import React, { Component } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import AwakeningBox from './AwakeningBox.js';
import TypeBox from './TypeBox.js';
import ResultList from './ResultList.js';
import axios from 'axios';
import './SearchBox.css';

class SearchBox extends Component {
	state = {
		awakenings: [],
		types: [],
		results: []
	};

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

	search() {
		let url = 'http://localhost:8080/api/monsters?';
		let queryArgs = [];

		if (this.state.awakenings.length) {
			queryArgs.push('awakenings=' + this.state.awakenings.join());
		}

		if (this.state.types.length) {
			queryArgs.push('types=' + this.state.types.join());
		}

		url += queryArgs.join('&');

		axios.get(url)
			.then(response => {
				this.setState({
					results: response.data
				});
			});

	}

	render() {
		return (
			<div className="SearchBox">
				<Grid className="SearchGrid">
					<Grid.Column mobile={16} tablet={9} computer={9}>
						<Grid>
							<Grid.Column width={5}>
								<TypeBox
									types={this.state.types}
									toggleType={this.toggleType.bind(this)}
								/>
							</Grid.Column>
							<Grid.Column width={11}>
								Elements
							</Grid.Column>
						</Grid>
						<br />
						<AwakeningBox
							awakenings={this.state.awakenings}
							addAwakening={this.addAwakening.bind(this)}
							removeAwakening={this.removeAwakening.bind(this)}
						/>
						<br />
						<Button onClick={this.search.bind(this)}>Search</Button>
					</Grid.Column>
					<Grid.Column mobile={16} tablet={7} computer={7}>
						<ResultList results={this.state.results} />
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}

export default SearchBox;
