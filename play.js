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
  bp: 12,
};
//usesless
function trimmer(fenArray) {
  arrlen = fenArray.length;
  var count = 0;
  var trimmedArr = [];

  for (i = 0; i < arrlen; i++) {
    const char = fenArray[i];
    if (char == "/") {
      count++;
    } else if (count == 7) {
      if (char == "b" || char == "w") {
        break;
      } else {
        trimmedArr.push(char);
      }
    } else {
      trimmedArr.push(char);
    }
  }

  return trimmedArr;
}

function adder(pos) {
  var count = 0;
  for (i = 0; i < pos.length; i++) {
    const char = pos[i];
    var toBeAdded = evalPoints[char];
    if (toBeAdded) {
      count = count + toBeAdded;
    } else {
      continue;
    }
  }

  return count;
}

function evaluator(fen) {
  const pos = trimmer(Array.from(fen));
  const initial = adder(pos);

  return initial;
}

function eval(gamesource, possibles, turn, bestMoveArr) {
  var game1 = new Chess(gamesource.fen());

  if (turn == "b") {
    var bestMove;

    if (possibles.length > 1) {
      game1.move(possibles[1]);

      const score1 = evaluator(game1.fen());
      const removed = possibles.shift();
      if (score1 < bestMoveArr[1]) {
        const newAcc = [possibles[0], score1];

        bestMove = eval(gamesource, possibles, turn, newAcc);
      } else {
        bestMove = eval(gamesource, possibles, turn, bestMoveArr);
      }
    } else {
      //console.log(bestMoveArr[0] + "this is best move for " + turn);
      return bestMoveArr;
    }

    return bestMove;
  } else {
    var bestMove;

    if (possibles.length > 1) {
      game1.move(possibles[1]);

      const score1 = evaluator(game1.fen());
      const removed = possibles.shift();
      if (score1 > bestMoveArr[1]) {
        const newAcc = [possibles[0], score1];

        bestMove = eval(gamesource, possibles, turn, newAcc);
      } else {
        bestMove = eval(gamesource, possibles, turn, bestMoveArr);
      }
    } else {
      //console.log(bestMoveArr[0] + "this is last move for " + turn);
      return bestMoveArr;
    }

    return bestMove;
  }
}

function channeler(gamesource, maximizingPlayer) {
  var turn;

  if (maximizingPlayer) {
    turn = "w";
  } else {
    turn = "b";
  }

  var gameNow = new Chess(gamesource.fen());
  const possibleMoves = gameNow.moves();

  gameNow.move(possibleMoves[0]);
  const score0 = evaluator(gameNow.fen());

  return eval(gamesource, possibleMoves, turn, [possibleMoves[0], score0]);
}

//New Code with square eval

var evaluateBoard = function (board) {
  var totalEvaluation = 0;
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i, j);
    }
  }
  return totalEvaluation;
};

var getPieceValue = function (piece, x, y) {
  if (piece === null) {
    return 0;
  }
  var getAbsoluteValue = function (piece, isWhite, x, y) {
    if (piece.type === "p") {
      return 10 + (isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x]);
    } else if (piece.type === "r") {
      return 50 + (isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x]);
    } else if (piece.type === "n") {
      return 30 + knightEval[y][x];
    } else if (piece.type === "b") {
      return 30 + (isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x]);
    } else if (piece.type === "q") {
      return 90 + evalQueen[y][x];
    } else if (piece.type === "k") {
      return 900 + (isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x]);
    }
    throw "Unknown piece type: " + piece.type;
  };

  var absoluteValue = getAbsoluteValue(piece, piece.color === "w", x, y);
  return piece.color === "w" ? absoluteValue : -absoluteValue;
};

var reverseArray = function (array) {
  return array.slice().reverse();
};

var pawnEvalWhite = [
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
  [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
  [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
  [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
  [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
  [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
];

var pawnEvalBlack = reverseArray(pawnEvalWhite);

var knightEval = [
  [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
  [-4.0, -2.0, 0.0, 0.0, 0.0, 0.0, -2.0, -4.0],
  [-3.0, 0.0, 1.0, 1.5, 1.5, 1.0, 0.0, -3.0],
  [-3.0, 0.5, 1.5, 2.0, 2.0, 1.5, 0.5, -3.0],
  [-3.0, 0.0, 1.5, 2.0, 2.0, 1.5, 0.0, -3.0],
  [-3.0, 0.5, 1.0, 1.5, 1.5, 1.0, 0.5, -3.0],
  [-4.0, -2.0, 0.0, 0.5, 0.5, 0.0, -2.0, -4.0],
  [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
];

var bishopEvalWhite = [
  [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
  [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 1.0, 1.0, 0.5, 0.0, -1.0],
  [-1.0, 0.5, 0.5, 1.0, 1.0, 0.5, 0.5, -1.0],
  [-1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, -1.0],
  [-1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0],
  [-1.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, -1.0],
  [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
];

var bishopEvalBlack = reverseArray(bishopEvalWhite);

var rookEvalWhite = [
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [0.0, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0],
];

var rookEvalBlack = reverseArray(rookEvalWhite);

var evalQueen = [
  [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
  [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
  [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
  [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
  [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
];

var kingEvalWhite = [
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
  [-1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
  [2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0],
  [2.0, 3.0, 1.0, 0.0, 0.0, 1.0, 3.0, 2.0],
];

var kingEvalBlack = reverseArray(kingEvalWhite);

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
    if (
      move.indexOf("x") == -1 &&
      move.indexOf("B") != 0 &&
      move.indexOf("N") != 0 &&
      move.indexOf("Q") != 0
    ) {
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

//Minimax begins here :

function init_zobrist() {
  var table = new Array(64).fill(null).map((x) => {
    return new Array(12).fill(null);
  });

  for (var i = 1; i < 64; i++) {
    for (var j = 1; j < 12; j++) {
      table[i][j] = Math.floor(Math.random() * (Math.pow(2, 32) - 1));
    }
  }
}

const tableOfvalues = init_zobrist();
var hashValue = 0;
var hashTable = new Array(Math.pow(2, 32) - 1).fill(null); //check

function hashInitial(board) {
  for (var i = 1; i < 8; i++) {
    for (var j = 1; j < 8; j++) {
      if (board[i][j] != null) {
        var obj = board[i][j];
        var pcNumber = pcContract[obj[color].concat(obj[type])];
        hashValue = hashValue ^ tableOfvalues[i * j][pcNumber];
      }
    }
  }
}

function hashPC(pc, boardHash, sqLetter, sqRowNum) {
  const pcNumber = pcContract[pc];
  sqColNum = parseInt(sqLetter);
  sqNum = sqColNum * sqRowNum;
  const pcZorbKey = tableOfvalues[sqNum][pcNumber];
  var newBoardHash;

  newBoardHash = boardHash ^ pcZorbKey;

  return newBoardHash;
}

function miniMax(gamesource, depth, Alpha, Beta, maximizingPlayer) {
  //   console.log(depth);
  // for (i = 0; i < 10; i++) {
  //   console.log(i);
  // }
  const newDepth = depth - 1;

  if (depth == 0) {
    const staticGame = gamesource;
    //chosenMove = channeler(staticGame, maximizingPlayer);
    chosenMove = ["", evaluateBoard(staticGame.board())]; // evaluator(staticGame.fen())];

    return chosenMove;
  }
  // miniMax(gamesource, newDepth, true);

  // const gameNow = new Chess(gamesource.fen());
  const possibleMoves = reOrder(gamesource.moves()); // gamesource.moves(); //
  //console.log(possibleMoves);
  const lengthOfPossible = possibleMoves.length;

  if (maximizingPlayer) {
    console.log(possibleMoves);
    var maxEval = -Infinity;
    var chosenMove = [];
    for (var i = 0; i < lengthOfPossible; i++) {
      console.log("whites turn  " + i);
      var gameNewMove = new Chess(gamesource.fen());
      gameNewMove.move(possibleMoves[i]);
      var result = miniMax(gameNewMove, newDepth, Alpha, Beta, false);
      var evaluation = result[1];

      if (evaluation > maxEval) {
        maxEval = evaluation;
        chosenMove = [possibleMoves[i], maxEval];
      }

      Alpha = Math.max(Alpha, evaluation);
      if (Beta <= Alpha) {
        console.log("we pruned in Alpha  " + i);
        break;
      }
    }

    return chosenMove;
  } else {
    console.log(possibleMoves);
    var minEval = +Infinity;
    var chosenMove = [];
    //console.log(possibleMoves.length + "this is lennn");
    for (var i = 0; i < lengthOfPossible; i++) {
      console.log("blacks turn");
      var gameNewMove = new Chess(gamesource.fen());
      gameNewMove.move(possibleMoves[i]);
      const result = miniMax(gameNewMove, newDepth, Alpha, Beta, true);
      //console.log(result);
      var evaluation = result[1];

      if (evaluation < minEval) {
        minEval = evaluation;
        chosenMove = [possibleMoves[i], minEval];
      }

      Beta = Math.min(Beta, evaluation);
      if (Beta <= Alpha) {
        console.log("we pruned in Beta   " + i);
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
    hashInitial();
    // game over
    if (possibleMoves.length === 0) return console.log("GG");
    console.log(game.board());
    // var game0 = new Chess(game.fen());
    // console.log(game0.fen());
    // game0.move(possibleMoves[0]);
    // console.log(game0.fen());
    // const score0 = evaluator(game0.fen());
    // game.move(eval(game, possibleMoves, turn, [possibleMoves[0], score0]));
    nextMove = miniMax(game, doopth, -Infinity, +Infinity, false);
    game.move(nextMove[0]);
    console.log("nextMove here:  " + nextMove, game.fen());

    board.position(game.fen());
  }

  function onDrop(source, target) {
    // see if the move is legal

    var move = game.move({
      from: source,
      to: target,
      promotion: "q", // NOTE: always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return "snapback";

    // make random legal move for black
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
    onSnapEnd: onSnapEnd,
  };

  board = Chessboard("myBoard", config);
}

play();
