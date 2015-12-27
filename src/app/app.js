import React from 'react';
import ReactDOM from 'react-dom';

import {default as GameMechs} from './game/Game';
import Game from './components/Game';

const GAME = new GameMechs();

ReactDOM.render(
	<Game
		game={GAME}
	/>,
	document.getElementById('app')
);
