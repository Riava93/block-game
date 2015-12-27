import React from 'react';

//Styles
import '../styles/blocks.scss';

class Block extends React.Component {
	render() {
		let block = this.props.block;
		let classes = `block ${block.colour}`;

		return (
			<div
				onClick={this.props.find.bind(this, block)}
				className={classes}>
			</div>
		);
	}
}

export default Block;
