import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import AwakeningBox from './AwakeningBox.js';
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
