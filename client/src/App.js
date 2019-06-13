import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import logo from './logo.svg';
import './App.css';
import SearchBox from './SearchBox.js';
import axios from 'axios';

class App extends Component {
	state = { message: null };

	componentDidMount() {
		axios.get('http://localhost:8080')
			.then(result => this.setState({ message: result.data.message }));
	}

	render() {
		const { message } = this.state;
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					{ message ? <p>{message}</p> : <p>Loading...</p> }
					<a
						className="App-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Button>Learn React</Button>
					</a>
				</header>
				<SearchBox />
			</div>
		);
	}
}

export default App;
