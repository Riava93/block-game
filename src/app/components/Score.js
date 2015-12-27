import React from 'react';

//Styles
import '../styles/score.scss';

class Score extends React.Component {
	render() {
		let points = this.props.points;

		return (
			<div id="game-score">
				<div className="score-card-header">
					<h3>Your Score</h3>
				</div>

				<div className="score-card-body">
					{points}
				</div>
			</div>
		);
	}
}

export default Score;
