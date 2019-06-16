import React, { Component } from 'react';
import { Button, Container, Grid } from 'semantic-ui-react';
import AwakeningBox from './AwakeningBox.js';
import axios from 'axios';
//import './App.css';

class SearchBox extends Component {
	state = {
		awakenings: []
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
			.then(result => console.log(result.data));
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
						<Button onClick={this.search.bind(this)}>Search</Button>
					</Grid.Column>
					<Grid.Column mobile={16} tablet={7} computer={7}>
						<Container>Search Results</Container>
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}

export default SearchBox;
