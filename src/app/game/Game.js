'use strict';

const COLOURS = ['orange', 'blue', 'green', 'red'];

class Score {
	constructor() {
		this.points = 0;
		this.multiplier = 2;
	}

	addPoints(amount, multiplier) {
		let mult = multiplier || this.multiplier;
		let total = (amount * mult);
		console.log(`Old score: ${this.points}`);
		this.points += total;

		console.log(`
			The new score is: ${this.points}, using ${mult}x multiplier`);
	}

	removePoints(amount, multiplier) {
		let mult = multiplier || this.multiplier;
		let total = (amount * mult);
		this.points -= total;
	}
}

class Block {
	constructor(coords, game) {
		this.alive = true;
		this.coords = coords;
		this.game = game;

		this._chooseColour();
	}

	_chooseColour() {
		let randInt = Math.floor(Math.random() * COLOURS.length);
		this.colour = COLOURS[randInt];
	}

	//Both these will be called by React Components.
	//This is only here for testing purposes.
	find() {
		this.game.watchForChanges();
		this.detectAdjacentBlocks();
	}

	detectAdjacentBlocks() {
		let blocks = this._getBlocksAtCardinals();

		//DEBUG INFO
		console.log(`${blocks.length} blocks found. %o`, blocks);
		console.log('%c  =   ', `background: ${this.colour}; color: white;`);

		blocks.map((block, idx) => {
			console.log(`${block.colour} block ${idx} %o`, block.coords);
		});
		//DEBUG INFO

		blocks.map((block) => {
			if (this._findMatchingColour(block) &&
			   !this.game.doesMatchesContainBlock(block)) {
				this.game.blockMatches.push(block);
				block.detectAdjacentBlocks();
				//TODO Remove this log when done testing!
				console.log(`${block.colour} block,
							x: ${block.coords.x},
							y: ${block.coords.y}`);
			}
		});
	}

	_findMatchingColour(block) {
		if (!!block.colour && block.colour === this.colour) {
			return true;
		} else {
			return false;
		}
	}

	//TODO: Refactor conditions into clean position
	//validating function.
	_getBlocksAtCardinals() {
		let startX = this.coords.x,
			startY = this.coords.y,
			yUpperBound = this.game.grid[startX].length,
			blocks = [];

		if ((startY - 1) >= 0) {
			let upperBlock = this.game.grid[startX][startY - 1];
			if (upperBlock) {
				blocks.push(this.game.grid[startX][startY - 1]);
			}
		}

		if ((startY + 1) < yUpperBound) {
			let bottomBlock = this.game.grid[startX][startY + 1];
			if (bottomBlock) {
				blocks.push(this.game.grid[startX][startY + 1]);
			}
		}

		if ((startX - 1) >= 0) {
			let leftBlock = this.game.grid[startX - 1][startY];
			if (!!leftBlock) {
				blocks.push(this.game.grid[startX - 1][startY]);
			}
		}

		if ((startX + 1) < 5) {
			let rightBlock = this.game.grid[startX + 1][startY];
			if (rightBlock) {
				blocks.push(this.game.grid[startX + 1][startY]);
			}
		}

		return blocks;
	}
}

class Game {
	constructor() {
		this.x = 5;
		this.y = 10;
		this.scoreBoard = new Score();
		this.blockMatches = [];

		this.constructGrid();
	}

	/**
	 * Constructs a 5x10 grid of Blocks. This is
	 * done with nested arrays.
	 */
	constructGrid() {
		this.grid = [];

		for (let i = 0; i < this.x; i++) {
			this.grid.push([]);
			for (let b = 0; b < this.y; b++) {
				this.grid[i].push(new Block({x: i, y: b}, this));
			}
		}
	}

	/**
	 * This is called by a block that is clicked and running
	 * the detectAdjacentBlocks function. This will check the
	 * match array to see if the length of the array has changed.
	 * This way we know if the blocks are finished adding to the
	 * array by checking every .5 seconds.
	 */
	watchForChanges() {
		let matchesLength = this.blockMatches.length;

		let timeout = setTimeout(() => {
			if (matchesLength !== this.blockMatches.length) {
				clearTimeout(timeout);
				this.watchForChanges();
			} else {
				clearTimeout(timeout);
				this._removeSelectedBlocks();
			}
		}, 200);
	}

	/**
	 * Need to go through all blocks and see if there are any
	 * with adjacent blocks of matching color.
	 * If none, game is over and must be restarted..
	 */
	determineGameState() {
		let gameInProgress = false;
		for (let i = 0; i < this.grid.length; i++) {
			for (let b = 0; b < this.grid[i].length; b++) {
				this.grid[i][b].detectAdjacentBlocks();
				if (this.blockMatches.length > 0) {
					gameInProgress = true;
					break;
				}
			}
			if (gameInProgress) {
				break;
			}
		}

		return gameInProgress;
	}

	//TODO: Test this code when we are able to determine that all blocks are
	//done detecting and adding blocks to the match array.
	//This can only be called after that has finished.
	_removeSelectedBlocks() {
		let matchLength = this.blockMatches.length;

		if (matchLength > 0) {
			this.blockMatches.forEach((block) => {
				let idx = this.grid[block.coords.x].indexOf(block);
				this.grid[block.coords.x].splice(idx, 1);
			});

			//Update score
			let multiplier = matchLength > 3 ? Math.floor(matchLength / 2) :
				undefined;
			this.scoreBoard.addPoints(matchLength, multiplier);

			this.blockMatches = [];
		}
	}

	doesMatchesContainBlock(block) {
		let success = false;

		this.blockMatches.forEach(function(ownedBlock) {
			if (block === ownedBlock) {
				success = true;
			}
		});
		return success;
	}

	resetGame() {
		console.log('[Reseting game...]');
		this.constructGrid();
		this.scoreBoard.points = 0;
	}
}

export default Game;
