import React, { Component } from 'react';
import { Grid, Image, List, Loader, Segment } from 'semantic-ui-react';
import icons from './awakeningIcons.js';
import placeholder from './icons/awakenings/0.png';
import './Result.css';

class Result extends Component {
	state = {};

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

	getIcon() {
		import(`./icons/monsters/${this.props.id}.png`)
			.then(result => this.setState({
				iconUrl: result.default
			}));
	}

	componentDidMount() {
		this.getIcon();
		this.getAwakenings();
	}

	componentDidUpdate(oldProps) {
		if (this.props.id !== oldProps.id) {
			this.getIcon();
			this.getAwakenings();
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
									<div className="ResultName">{this.props.name}</div>
								</Segment>
								<Segment className="ResultSegment">
									<List horizontal>
									{
										this.state.awakenings ?
										this.state.awakenings.map(id =>
											<List.Item>
												<Image src={icons[id]} />
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
