import React from 'react';

import Score from './Score';
import Grid from './Grid';

class Game extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			points: this.props.game.scoreBoard.points,
			grid: this.props.game.grid
		};

		this.findBlocks = this.findBlocks.bind(this);
		this.resetGame = this.resetGame.bind(this);
		this.refreshState = this.refreshState.bind(this);
		this.resetGame = this.resetGame.bind(this);
	}

	findBlocks(block) {
		block.find();

		let timeout = setTimeout(() => {
			this.refreshState();
		}, 400);
	}

	refreshState() {
		this.setState({
			points: this.props.game.scoreBoard.points,
			grid: this.props.game.grid
		});
	}

	resetGame() {
		this.props.game.resetGame();
		this.refreshState();
	}

	render() {
		return (
			<div>
				<Score points={this.state.points} />
				<Grid
					grid={this.state.grid}
					find={this.findBlocks}
				/>

				<button
					className="reset-game"
					onClick={this.resetGame}>
					Reset Game
				</button>
			</div>
		);
	}
}

export default Game;
