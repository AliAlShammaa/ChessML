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
