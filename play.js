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

function get {};

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

  for (var i = 0; i < 64; i++) {
    for (var j = 0; j < 12; j++) {
      table[i][j] = Math.floor(Math.random() * (Math.pow(2, 10) - 1));
    }
  }

  return table;
}

strABC = "abcdefgh";
const tableOfvalues = init_zobrist();
console.log(tableOfvalues);
var hashValue = 0;
var hashTable = new Array(Math.pow(2, 10) - 1).fill(null);

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
  const pcNumber = pcContract[pc];
  sqColNum = strABC.lastIndexOf(sqLetter);
  sqNum = 8 * (8 - parseInt(sqRowNum)) + sqColNum;
  const pcZorbKey = tableOfvalues[sqNum][pcNumber - 1];
  var newBoardHash;

  newBoardHash = boardHash ^ pcZorbKey;

  return newBoardHash;
}


function getCurrentSq (game, nextMove) {
  if (nextMove[0] == "O-O" || nextMove[0] == "O-O-O" )  return null
  hist = game.history({verbose:true})




}


 // No En Passant
function AddHashTable(nextMove, currentSq,  turn) {
  

  var pc = nextMove[0].charAt(0);
  var sqLetter;
  var sqRowNum;
  if (sqLetter != " " && sqLetter != "x" && sqLetter != "-") {
    var sqLetter = nextMove[0].charAt(1);
    var sqRowNum = nextMove[0].charAt(2);
    pc = turn.concat(pc.toLowerCase());
    var takeAwayHash = hashPC(pc, hashValue, "b", "8");
    var nextMoveHash = hashPC(pc, takeAwayHash, sqLetter, sqRowNum);
    hashTable[nextMoveHash] = { 1: nextMove[1] };
  } else if (sqLetter == "x") {
    sqLetter = nextMove[0].charAt(2);
    sqRowNum = nextMove[0].charAt(3);
    pc = turn.concat(pc.toLowerCase());
    var takeAwayHash = hashPC(pc, hashValue, "b", "8");
    var nextMoveHash = hashPC(pc, takeAwayHash, sqLetter, sqRowNum);
    hashTable[nextMoveHash] = { 1: nextMove[1] };
  } else if (nextMove[0] == "O-O") {
     if  (turn == "w") {
      var sqLetter = "g"
      var sqRowNum = "1"
      pc = "wk"
      var takeAwayHash = hashPC(pc, hashValue, "e", "1");
      var nextMoveHash = hashPC(pc, takeAwayHash, sqLetter, sqRowNum);
      var sqLetter = "f"
      var sqRowNum = "1"
      pc = "wr"
      var takeAwayHashr = hashPC(pc, nextMoveHash, "h", "1");
      var nextMoveHashr = hashPC(pc, takeAwayHashr, sqLetter, sqRowNum);
      hashTable[nextMoveHashr] = { 1: nextMove[1] };

     } else {
      var sqLetter = "g"
      var sqRowNum = "8"
      pc = "bk"
      var takeAwayHash = hashPC(pc, hashValue, "e", "8");
      var nextMoveHash = hashPC(pc, takeAwayHash, sqLetter, sqRowNum);
      var sqLetter = "f"
      var sqRowNum = "8"
      pc = "br"
      var takeAwayHashr = hashPC(pc, nextMoveHash, "h", "8");
      var nextMoveHashr = hashPC(pc, takeAwayHashr, sqLetter, sqRowNum);
      hashTable[nextMoveHashr] = { 1: nextMove[1] };
     }
  } else {
    if  (turn == "w") {
      var sqLetter = "b"
      var sqRowNum = "1"
      pc = "wk"
      var takeAwayHash = hashPC(pc, hashValue, "e", "1");
      var nextMoveHash = hashPC(pc, takeAwayHash, sqLetter, sqRowNum);
      var sqLetter = "c"
      var sqRowNum = "1"
      pc = "wr"
      var takeAwayHashr = hashPC(pc, nextMoveHash, "a", "1");
      var nextMoveHashr = hashPC(pc, takeAwayHashr, sqLetter, sqRowNum);
      hashTable[nextMoveHashr] = { 1: nextMove[1] };

     } else {
      var sqLetter = "b"
      var sqRowNum = "8"
      pc = "bk"
      var takeAwayHash = hashPC(pc, hashValue, "e", "8");
      var nextMoveHash = hashPC(pc, takeAwayHash, sqLetter, sqRowNum);
      var sqLetter = "fc"
      var sqRowNum = "8"
      pc = "br"
      var takeAwayHashr = hashPC(pc, nextMoveHash, "a", "8");
      var nextMoveHashr = hashPC(pc, takeAwayHashr, sqLetter, sqRowNum);
      hashTable[nextMoveHashr] = { 1: nextMove[1] };
     }
  }

  console.log(hashTable);
}

function miniMax(gamesource, depth, Alpha, Beta, maximizingPlayer) {
  
  const newDepth = depth - 1;

  if (depth == 0) {
    const staticGame = gamesource;
    chosenMove = ["", evaluateBoard(staticGame.board())]; // evaluator(staticGame.fen())];
    return chosenMove;
  }
  
  const possibleMoves = reOrder(gamesource.moves());
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
    hashInitial(game.board());

    // game over
    if (possibleMoves.length === 0) return console.log("GG");

    console.log(hashValue);    
    nextMove = miniMax(game, doopth, -Infinity, +Infinity, false);
    game.move(nextMove[0]);
    console.log("nextMove here:  " + nextMove, game.fen());
    AddHashTable(nextMove, getCurrentSq (game, nextMove), "b")

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
