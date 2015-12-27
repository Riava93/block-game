import React from 'react';

import Block from './Block';

//Styles
import '../styles/grid.scss';

class Grid extends React.Component {
	render() {
		let grid = this.props.grid;

		return (
			<div className="grid-container">
				<div className="grid">
					{grid.map((x, idx) => {
						return (
							<div className="gridCol" key={`x-${idx}`}>
								{x.map((y, i) => {
									return (
										<Block
											find={this.props.find}
											key={`y-${i}`}
											block={y}
										/>
									);
								})}
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Grid;
