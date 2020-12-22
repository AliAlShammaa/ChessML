// const evalPoints = {
//   P: 1,
//   R: 5,
//   N: 3,
//   B: 3.2,
//   Q: 10,
//   p: -1,
//   r: -5,
//   n: -3,
//   b: -3.2,
//   q: -10,
// };

const pcContract = {
	wr: 1,
	wn: 2,
	wb: 3,
	wq: 4,
	wk: 5,
	wp: 6,
	br: 7,
	bn: 8,
	bb: 9,
	bq: 10,
	bk: 11,
	bp: 12
};

//New Code with square eval

function reOrder(possArr) {
	const captures = possArr.filter((move) => {
		if (move.indexOf("x") != -1) {
			return move;
		}
	});

	const bishopKnightMoves = possArr.filter((move) => {
		var bishOrKni = move.indexOf("B") == 0 || move.indexOf("N") == 0;
		if (bishOrKni && move.indexOf("x") == -1) {
			return move;
		}
	});

	const queenMoves = possArr.filter((move) => {
		if (move.indexOf("Q") == 0 && move.indexOf("x") == -1) {
			return move;
		}
	});

	const castlingMoves = possArr.filter((move) => {
		if (move.indexOf("O") == 0) {
			return move;
		}
	});

	const rookMoves = possArr.filter((move) => {
		if (move.indexOf("R") == 0 && move.indexOf("x") == -1) {
			return move;
		}
	});

	const centerMoves = possArr.filter((move) => {
		if (move.indexOf("e") == 0 || move.indexOf("d") == 0) {
			return move;
		}
	});

	const laterlMoves = possArr.filter((move) => {
		if (move.indexOf("c") == 0 || move.indexOf("f") == 0) {
			return move;
		}
	});

	const None = possArr.filter((move) => {
		if (
			move.indexOf("x") == -1 &&
			move.indexOf("B") != 0 &&
			move.indexOf("N") != 0 &&
			move.indexOf("Q") != 0 &&
			move.indexOf("R") != 0 &&
			move.indexOf("O") == -1 &&
			move.lastIndexOf("e") != 0 &&
			move.lastIndexOf("d") != 0 &&
			move.lastIndexOf("f") != 0 &&
			move.lastIndexOf("c") != 0
		) {
			return move;
		}
	});

	return captures
		.concat(centerMoves)
		.concat(bishopKnightMoves)
		.concat(queenMoves)
		.concat(castlingMoves)
		.concat(laterlMoves)
		.concat(None)
		.concat(rookMoves);
}

function reOrder1(possArr) {
	const captures = possArr.filter((move) => {
		if (move.indexOf("x") != -1) {
			return move;
		}
	});

	const bishopKnightMoves = possArr.filter((move) => {
		var bishOrKni = move.indexOf("B") == 0 || move.indexOf("N") == 0;
		if (bishOrKni && move.indexOf("x") == -1) {
			return move;
		}
	});

	const queenMoves = possArr.filter((move) => {
		if (move.indexOf("Q") == 0 && move.indexOf("x") == -1) {
			return move;
		}
	});

	// const castlingMoves = possArr.filter((move) => {
	//   if (move.indexOf("O") == 0) {
	//     return move;
	//   }
	// });

	// const rookMoves = possArr.filter((move) => {
	//   if (move.indexOf("R") == 0 && move.indexOf("x") == -1) {
	//     return move;
	//   }
	// });

	// const centerMoves = possArr.filter((move) => {
	//   if (move.indexOf("e") == 0 || move.indexOf("d") == 0) {
	//     return move;
	//   }
	// });

	// const laterlMoves = possArr.filter((move) => {
	//   if (move.indexOf("c") == 0 || move.indexOf("f") == 0) {
	//     return move;
	//   }
	// });

	const None = possArr.filter((move) => {
		if (move.indexOf("x") == -1 && move.indexOf("B") != 0 && move.indexOf("N") != 0 && move.indexOf("Q") != 0) {
			// move.indexOf("R") != 0 &&
			// move.indexOf("O") == -1 &&
			// move.lastIndexOf("e") != 0 &&
			// move.lastIndexOf("d") != 0 &&
			// move.lastIndexOf("f") != 0 &&
			// move.lastIndexOf("c") != 0
			return move;
		}
	});

	return (
		captures
			// .concat(centerMoves)
			.concat(bishopKnightMoves)
			.concat(queenMoves)
			// .concat(castlingMoves)
			//.concat(laterlMoves)
			.concat(None)
	);
	// .concat(rookMoves);
}

//Iterative Deepinning
function iterativeDeep(game, depth, maximizingPlayer, gameHash) {
	var bestMove = [];
	for (var i = 1; i <= depth; i++) {
		NodesNotSearched = 0;
		NodesSearched = 0;
		bestMove = miniMax(game, i, -Infinity, +Infinity, maximizingPlayer, gameHash, true, bestMove);
		console.log(i, bestMove);
	}
	return bestMove;
}

// Zobrist Hashing and TT:

function init_zobrist() {
	var table = new Array(64).fill(null).map((x) => {
		return new Array(12).fill(null);
	});

	for (var i = 0; i < 64; i++) {
		for (var j = 0; j < 12; j++) {
			table[i][j] = Math.floor(Math.random() * (Math.pow(2, 32) - 1));
		}
	}

	return table;
}

strABC = "abcdefgh";
const tableOfvalues = init_zobrist();
const tableSize = Math.pow(2, 24) + Math.pow(2, 21);
var hashValue = 0;
var hashTable = new Array(tableSize).fill(null);

function hashInitial(board) {
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			if (board[i][j] != null) {
				var obj = board[i][j];
				var pcNumber = pcContract[obj["color"].concat(obj["type"])];
				hashValue = hashValue ^ tableOfvalues[i * 8 + j][pcNumber - 1];
			}
		}
	}
}

function hashPC(pc, boardHash, sqLetter, sqRowNum) {
	var pcNumber = pcContract[pc];
	sqColNum = strABC.lastIndexOf(sqLetter);
	sqNum = 8 * (8 - parseInt(sqRowNum)) + sqColNum;
	// console.log(sqLetter, sqRowNum, sqNum, pcNumber - 1);
	var pcZorbKey = tableOfvalues[sqNum][pcNumber - 1];
	var newBoardHash;

	newBoardHash = boardHash ^ pcZorbKey;

	return newBoardHash;
}

function getCurrentSq(game, nextMove) {
	if (nextMove == "O-O" || nextMove == "O-O-O") return null;
	hist = game.history({ verbose: true });
	fromSq = hist[hist.length - 1]["from"];
	//console.log(hist, fromSq);
	return fromSq;
}

var NodesNotSearched = 0;
var NodesSearched = 0;
// No En Passant
function addLookUpHashTable(nextMove, currentSq, turn, gameHash) {
	var pc = nextMove.charAt(0);
	var sqLetter = nextMove.charAt(1);
	var sqRowNum = nextMove.charAt(2);
	var nextMoveHash; //Nce2 Nfxd5

	if (sqLetter != "x" && sqLetter != "-") {
		if (pc == pc.toLowerCase()) {
			pc = turn.concat("p");
			sqLetter = nextMove.charAt(0);
			sqRowNum = nextMove.charAt(1);
		} else {
			pc = turn.concat(pc.toLowerCase());
		}

		if (isNaN(sqRowNum) && nextMove.length > 4) {
			sqLetter = nextMove.charAt(3);
			sqRowNum = nextMove.charAt(4);
		} else if (isNaN(sqRowNum)) {
			sqLetter = nextMove.charAt(2);
			sqRowNum = nextMove.charAt(3);
		}

		var takeAwayHash = hashPC(pc, gameHash, currentSq.charAt(0), currentSq.charAt(1));
		nextMoveHash = hashPC(pc, takeAwayHash, sqLetter, sqRowNum);
	} else if (sqLetter == "x" || sqRowNum == "x") {
		if (pc == pc.toLowerCase()) {
			pc = turn.concat("p");
		} else {
			pc = turn.concat(pc.toLowerCase());
		}

		if (sqLetter == "x") {
			sqLetter = nextMove.charAt(2);
			sqRowNum = nextMove.charAt(3);
		} else {
			sqLetter = nextMove.charAt(3);
			sqRowNum = nextMove.charAt(4);
		}

		var takeAwayHash = hashPC(pc, gameHash, currentSq.charAt(0), currentSq.charAt(1));
		nextMoveHash = hashPC(pc, takeAwayHash, sqLetter, sqRowNum);
	} else if (nextMove == "O-O") {
		if (turn == "w") {
			sqLetter = "g";
			sqRowNum = "1";
			pc = "wk";
			var takeAwayHash = hashPC(pc, gameHash, "e", "1");
			var nextMoveHash = hashPC(pc, takeAwayHash, sqLetter, sqRowNum);
			sqLetter = "f";
			sqRowNum = "1";
			pc = "wr";
			var takeAwayHashr = hashPC(pc, nextMoveHash, "h", "1");
			nextMoveHashr = hashPC(pc, takeAwayHashr, sqLetter, sqRowNum);
		} else {
			sqLetter = "g";
			sqRowNum = "8";
			pc = "bk";
			var takeAwayHash = hashPC(pc, gameHash, "e", "8");
			var nextMoveHash = hashPC(pc, takeAwayHash, sqLetter, sqRowNum);
			sqLetter = "f";
			sqRowNum = "8";
			pc = "br";
			var takeAwayHashr = hashPC(pc, nextMoveHash, "h", "8");
			nextMoveHashr = hashPC(pc, takeAwayHashr, sqLetter, sqRowNum);
		}
	} else {
		if (turn == "w") {
			sqLetter = "b";
			sqRowNum = "1";
			pc = "wk";
			var takeAwayHash = hashPC(pc, gameHash, "e", "1");
			var nextMoveHash = hashPC(pc, takeAwayHash, sqLetter, sqRowNum);
			sqLetter = "c";
			sqRowNum = "1";
			pc = "wr";
			var takeAwayHashr = hashPC(pc, nextMoveHash, "a", "1");
			nextMoveHashr = hashPC(pc, takeAwayHashr, sqLetter, sqRowNum);
		} else {
			sqLetter = "b";
			sqRowNum = "8";
			pc = "bk";
			var takeAwayHash = hashPC(pc, gameHash, "e", "8");
			var nextMoveHash = hashPC(pc, takeAwayHash, sqLetter, sqRowNum);
			sqLetter = "c";
			sqRowNum = "8";
			pc = "br";
			var takeAwayHashr = hashPC(pc, nextMoveHash, "a", "8");
			nextMoveHashr = hashPC(pc, takeAwayHashr, sqLetter, sqRowNum);
		}
	}

	// if (add) {
	//   hashTable[nextMoveHash] = props;
	// } else {
	return nextMoveHash;
}

//Minimax begins here :

function miniMax(gamesource, depth, Alpha, Beta, maximizingPlayer, gameHash, initial, bestMove) {
	const newDepth = depth - 1;

	if (depth == 0) {
		const staticGame = gamesource;
		chosenMove = ["", evaluateBoard(staticGame.board()), []];
		NodesSearched++;
		return chosenMove;
	}

	var possibleMoves;
	// Iterative Deepening
	if (depth > 1 && initial) {
		possibleMoves = [bestMove[0]].concat(reOrder(gamesource.moves()));
	} else {
		possibleMoves = reOrder(gamesource.moves());
	}

	const lengthOfPossible = possibleMoves.length;
	var evaluation;
	var result;

	if (maximizingPlayer) {
		//console.log(possibleMoves);
		var maxEval = -Infinity;
		var chosenMove = [];

		for (var i = 0; i < lengthOfPossible; i++) {
			//console.log("whites turn  " + i);
			var gameNewMove = new Chess(gamesource.fen());
			gameNewMove.move(possibleMoves[i]);
			var pathToLeaf;
			nextMoveHash = addLookUpHashTable(
				possibleMoves[i],
				getCurrentSq(gameNewMove, possibleMoves[i]),
				"w",
				gameHash
			);

			var hashObj = hashTable[nextMoveHash % tableSize];

			if (hashObj && hashObj.searchDepth >= depth && hashObj.flag == "Exact") {
				evaluation = hashObj["eval"];
				pathToLeaf = hashObj["path"];
				NodesNotSearched++;
			} else if (hashObj && hashObj.searchDepth >= depth && hashObj.flag == "Beta" && hashObj.eval <= Alpha) {
				NodesNotSearched++;
				continue;
			} else {
				result = miniMax(gameNewMove, newDepth, Alpha, Beta, false, nextMoveHash, false, null);
				NodesSearched++;
				evaluation = result[1];
				pathToLeaf = result[2];
				pathToLeaf[pathToLeaf.length] = possibleMoves[i];
				hashTable[nextMoveHash % tableSize] = {
					eval: evaluation,
					path: pathToLeaf,
					searchDepth: depth,
					flag: result[3]
				};
			}

			if (evaluation > maxEval) {
				maxEval = evaluation;
				chosenMove = [possibleMoves[i], maxEval, pathToLeaf, "Exact"];
			}

			Alpha = Math.max(Alpha, evaluation);
			if (Beta <= Alpha) {
				//console.log("we pruned in Alpha  " + i);
				chosenMove[chosenMove.length - 1] = "Alpha";
				break;
			}
		}

		return chosenMove;
	} else {
		// console.log(possibleMoves);
		var minEval = +Infinity;
		var chosenMove = [];
		for (var i = 0; i < lengthOfPossible; i++) {
			// console.log("blacks turn" + i);
			var gameNewMove = new Chess(gamesource.fen());
			var pathToLeaf;

			gameNewMove.move(possibleMoves[i]);

			nextMoveHash = addLookUpHashTable(
				possibleMoves[i],
				getCurrentSq(gameNewMove, possibleMoves[i]),
				"b",
				gameHash
			);

			var hashObj = hashTable[nextMoveHash % tableSize];

			if (hashObj && hashObj.searchDepth >= depth && hashObj.flag == "Exact") {
				evaluation = hashObj["eval"];
				pathToLeaf = hashObj["path"];
				NodesNotSearched++;
				//console.log(pathToLeaf);
			} else if (hashObj && hashObj.searchDepth >= depth && hashObj.flag == "Alpha" && hashObj.eval >= Beta) {
				NodesNotSearched++;
				continue;
			} else {
				result = miniMax(gameNewMove, newDepth, Alpha, Beta, true, nextMoveHash, false, null);
				NodesSearched;
				evaluation = result[1];
				pathToLeaf = result[2];
				pathToLeaf[pathToLeaf.length] = possibleMoves[i];
				hashTable[nextMoveHash % tableSize] = {
					eval: evaluation,
					path: pathToLeaf,
					searchDepth: depth,
					flag: result[3]
				};
			}

			if (evaluation < minEval) {
				minEval = evaluation;
				chosenMove = [possibleMoves[i], minEval, pathToLeaf, "Exact"];
			}

			Beta = Math.min(Beta, evaluation);
			if (Beta <= Alpha) {
				chosenMove[chosenMove.length - 1] = "Beta";
				//console.log("we pruned in Beta   " + i);
				break;
			}
		}

		return chosenMove;
	}
}

function play() {
	var board = null;
	var game = new Chess();

	//var doopth = document.getElementById("depth").value;

	function onDragStart(source, piece, position, orientation) {
		// do not pick up pieces if the game is over
		if (game.game_over()) return console.log("GG");

		// only pick up pieces for White
		if (piece.search(/^b/) !== -1) return false;
	}

	function playComp() {
		const turn = "b";
		var possibleMoves = game.moves();
		var doopth = parseInt($("#search-depth").find(":selected").text());

		// game over
		if (possibleMoves.length === 0) return console.log("GG");

		nextMove = iterativeDeep(game, doopth, false, hashValue);
		game.move(nextMove[0]);
		hashValue = addLookUpHashTable(nextMove[0], getCurrentSq(game, nextMove[0]), "b", hashValue);
		console.log("nextMove here:  " + nextMove[0], nextMove[1] / 10, nextMove[2], game.fen());
		board.position(game.fen());
		console.log(NodesNotSearched, NodesSearched);
	}

	function onDrop(source, target) {
		// see if the move is legal

		var move = game.move({
			from: source,
			to: target,
			promotion: "q" // NOTE: always promote to a queen for example simplicity
		});
		// illegal move
		if (move === null) return "snapback";

		//updates hashvalue
		latestMove = game.history()[game.history().length - 1];
		hashValue = addLookUpHashTable(latestMove, getCurrentSq(game, latestMove), "w", hashValue);
		console.log(hashValue);

		// make Best calculated legal move for black
		window.setTimeout(playComp, 250);
	}

	// update the board position after the piece snap
	// for castling, en passant, pawn promotion
	function onSnapEnd() {
		board.position(game.fen());
	}

	var config = {
		draggable: true,
		position: "start",
		onDragStart: onDragStart,
		onDrop: onDrop,
		onSnapEnd: onSnapEnd
	};

	board = Chessboard("myBoard", config);
}

play();
