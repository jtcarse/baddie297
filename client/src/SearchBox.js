import React, { Component } from 'react';
import { Button, Image, Input, Label, List } from 'semantic-ui-react';
import icons from './icons.js'
//import './App.css';

/*
const AwakeningButton = (props) => (
	<Button compact icon>
		<Image src={props.aId} />
	</Button>
)
*/

class AwakeningButton extends Component {
	onClick() {
		this.props.onClick(this.props.id);
	}

	render() {
		return (
			<Button compact icon onClick={this.onClick.bind(this)}>
				<Image src={this.props.icon} />
			</Button>
		);
	}
}

class AwakeningList extends Component {
	render() {
		return (
			<List horizontal>
				{ this.props.awakenings.map(id =>
					<List.Item>
						<Image src={icons[id]} />
					</List.Item>
				)}
			</List>
		);
	}
}

class SearchBox extends Component {
	state = {
		types: [],
		elements: [],
		awakenings: [],
		super_awakenings: []
	};

	addAwakening(a) {
		this.setState({
			awakenings: this.state.awakenings.concat([a])
		});
		console.log(this.state.awakenings);
	}

	componentDidMount() {/*
		fetch('http://localhost:8080')
			.then(response => response.json())
			.then(data => this.setState({ message: data.message }));
	*/}

	render() {
		return (
			<div className="SearchBox">
				{ Object.keys(icons).map(id =>
					<AwakeningButton
						id={id}
						icon={icons[id]}
						onClick={this.addAwakening.bind(this)}
					/>
				)}
				<AwakeningList awakenings={this.state.awakenings} />
			</div>
		);
	}
}

export default SearchBox;
