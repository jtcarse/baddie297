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
	onItemClick(i) {
		this.props.onItemClick(i);
	}

	render() {
		return (
			<List horizontal>
				{ this.props.awakenings.map((id, index) =>
					<List.Item onClick={this.onItemClick.bind(this, index)}>
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
	}

	removeAwakening(i) {
		let a = this.state.awakenings;
		a.splice(i, 1);
		this.setState({
			awakenings: a 
		});
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
				<br />
				<AwakeningList
					awakenings={this.state.awakenings}
					onItemClick={this.removeAwakening.bind(this)}
				/>
			</div>
		);
	}
}

export default SearchBox;
