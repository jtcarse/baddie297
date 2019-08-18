import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import logo from './logo.png';
import './App.css';
import SearchBox from './SearchBox.js';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<Image src={logo} />
				</header>
				<div className="App-body">
					<SearchBox />
				</div>
			</div>
		);
	}
}

export default App;
