import React, { Component } from 'react';
import { Button, Container, Grid } from 'semantic-ui-react';
import AwakeningBox from './AwakeningBox.js';
import ResultList from './ResultList.js';
import axios from 'axios';
//import './App.css';

class SearchBox extends Component {
	state = {
		awakenings: [],
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

	search() {
		let url = 'http://localhost:8080/api/monsters?';

		if (this.state.awakenings.length) {
			url += 'awakenings=' + this.state.awakenings.join();
		}

		axios.get(url)
			.then(response => {
				console.log(response.data);
				this.setState({
					results: response.data
				});
			});
	}

	render() {
		return (
			<div className="SearchBox">
				<Grid>
					<Grid.Column mobile={16} tablet={9} computer={9}>
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
