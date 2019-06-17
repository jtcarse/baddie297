import React, { Component } from 'react';
import { Grid, Image, List, Segment } from 'semantic-ui-react';
import icons from './awakeningIcons.js';
import placeholder from './icons/awakenings/0.png';
import monsterIcon from './icons/monsters/5217.png';
import './Result.css';

class Result extends Component {
	render() {
		let awakenings = [];
		if (Object.keys(this.props.awakenings).length) {
			Object.keys(this.props.awakenings).forEach(a => {
				for (let i = 0; i < this.props.awakenings[a]; i++) {
					awakenings.push(a);
				}
			});
		}

		return (
			<List.Item>
				<div className="Result">
					<Grid>
						<Grid.Row stretched>
							<Grid.Column width={3}>
								<Segment className="ResultSegment">
									<Image src={monsterIcon} />
								</Segment>
							</Grid.Column>
							<Grid.Column width={13}>
								<Segment className="ResultSegment">
									<div className="ResultName">{this.props.name}</div>
								</Segment>
								<Segment className="ResultSegment">
									<List horizontal>
									{
										awakenings.length ?
										awakenings.map(id =>
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
