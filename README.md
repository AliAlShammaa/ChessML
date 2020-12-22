## ChessML

A Computer Chess program (in javascript) that runs on Type A algorithims as described by Claude Shannon. Specifically, it uses a Minimax algorithim with AlphaBeta pruning.

## Imported Modules

chessboard.js --> Board contorl
chess.js --> Move generation

## AlphaBeta Enhancements

As of Dec 24 2020, the master branch includes the following enhancements to the AlphaBeta Pruning : - Transposition/hash Table (TT) with zobrist hashing - iterative depening framework - Killermove heuristics - best-first reordering

In the AlphaBeta algorithim, pruning occurs when one of the possible moves for a given game state (i.e. a node in the search tree) puts an upper/lower bound on the evaluation of the given node such that it becomes redundant of searching the rest of the possible moves because ancestor node(s) have a better option. This is implemented by adding the Alpha and Beta parameters in the Minimax algorithim. The above enhancements are then used to prioritize some of the possible moves over others as to cause a Beta cutoff in the search tree. TT, a hash table is also used to quickly store and retrieve moves previously evaluated.

## License

[MIT License](LICENSE.md)
