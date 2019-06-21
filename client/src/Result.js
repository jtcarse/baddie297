import React, { Component } from 'react';
import { Grid, Image, List, Loader, Segment } from 'semantic-ui-react';
import awakeningIcons from './awakeningIcons.js';
import placeholder from './icons/awakenings/0.png';
import typeIcons from './typeIcons.js';
import './Result.css';

class Result extends Component {
	state = {};

	getIcon() {
		import(`./icons/monsters/${this.props.id}.png`)
			.then(result => this.setState({
				iconUrl: result.default
			}));
	}

	getAwakenings() {
		let awakenings = [];
		if (Object.keys(this.props.awakenings).length) {
			Object.keys(this.props.awakenings).forEach(a => {
				for (let i = 0; i < this.props.awakenings[a]; i++) {
					awakenings.push(a);
				}
			});
		}

		this.setState({
			awakenings: awakenings
		});
	}

	getTypes() {
		this.setState({
			types: this.props.types
		});
	}

	componentDidMount() {
		this.getIcon();
		this.getAwakenings();
		this.getTypes();
	}

	componentDidUpdate(oldProps) {
		if (this.props.id !== oldProps.id) {
			this.getIcon();
			this.getAwakenings();
			this.getTypes();
		}
	}

	render() {
		return (
			<List.Item>
				<div className="Result">
					<Grid>
						<Grid.Row stretched>
							<Grid.Column width={3}>
								<Segment className="ResultSegment">
									{
										this.state.iconUrl ?
										<Image src={this.state.iconUrl} /> :
										<Loader active />
									}
								</Segment>
							</Grid.Column>
							<Grid.Column width={13}>
								<Segment className="ResultSegment">
									<List horizontal>
									{
										this.state.types ?
										this.state.types.map(t =>
											<List.Item>
												<Image src={typeIcons[t]} />
											</List.Item>
										) :
										<List.Item><Image src={placeholder} /></List.Item>
									}
									<List.Item><div className="ResultName">{this.props.name}</div></List.Item>
									</List>
								</Segment>
								<Segment className="ResultSegment">
									<List horizontal>
									{
										this.state.awakenings ?
										this.state.awakenings.map(id =>
											<List.Item>
												<Image src={awakeningIcons[id]} />
											</List.Item>
										) :
										<List.Item><Image src={placeholder} /></List.Item>
									}
									</List>
								</Segment>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</div>
			</List.Item>
		);
	}
}

export default Result;