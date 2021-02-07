import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoggerFactory } from '../log/logger-factory';
import { Observable } from 'rxjs';
import { User } from './user.service';
import { GameState, PlayingSign } from '../../@pages/game/game.component';
import { setArray } from '../utils/common';

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

  currentPlayerSign: string;
  finished: boolean;
  gameState: GameState;

  playerX: User;
  playerO: User;
  constructor(user: User) {
    const initialGame = setArray();
    this.row0 = initialGame.cellValue[0];
    this.row1 = initialGame.cellValue[1];
    this.row2 = initialGame.cellValue[2];
    this.finished = false;
    this.gameState = GameState.ACTIVE;
    this.currentPlayerSign = PlayingSign.X;
    this.playerX = user;
  }
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
}
