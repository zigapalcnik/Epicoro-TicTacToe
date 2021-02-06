import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoggerFactory } from '../log/logger-factory';
import { Observable } from 'rxjs';
import { User } from './user.service';
import { PlayingSign } from '../../@pages/game/game.component';

export class GameBoard {
  cellValue: string[][];

  constructor() {
    this.cellValue = [];
  }
}

export class GameStatus {
  id: string;
  row0: string[];
  row1: string[];
  row2: string[];
  currentPlayer: string;

  playerX: User;
  playerO: User;
}

@Injectable()
export class GameService {
  private static logger = LoggerFactory.getLogger(GameService.name);

  constructor(private db: AngularFirestore) {
  }

  startNewGame(gameData): Promise<any> {
    return this.db.collection('GameStatus').add(gameData);
  }

  updateGameStatus(gameId: string, gameStatus: GameStatus, game: GameBoard): Promise<any> {
    gameStatus.row0 = game.cellValue[0];
    gameStatus.row1 = game.cellValue[1];
    gameStatus.row2 = game.cellValue[2];

    const gameData = JSON.parse(JSON.stringify(gameStatus));
    return this.db.doc('GameStatus/' + gameId).update({ ...gameData });
  }

  fetchGameStatus(gameId: string): Observable<GameStatus> {
    return this.db.doc<GameStatus>('GameStatus/' + gameId).valueChanges();
  }

  setArray(): GameBoard {
    const game = new GameBoard();
    for (let i = 0; i < 3; i++) {
      game.cellValue[i] = [];
      for (let j = 0; j < 3; j++) {
        game.cellValue[i][j] = '';
      }
    }
    return game;
  }
}
