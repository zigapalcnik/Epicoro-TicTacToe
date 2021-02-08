import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoggerFactory } from '../log/logger-factory';
import { Observable } from 'rxjs';
import { User } from './user.service';
import { map } from 'rxjs/operators';

export enum PlayingSign {
  X = 'X',
  O = 'O',
}

export enum GameState {
  ACTIVE,
  DRAW,
  WINNER
}

export class GameBoard {
  cellValue: string[][] = [[]];

  constructor() {
    for (let i = 0; i < 3; i++) {
      this.cellValue[i] = [];
      for (let j = 0; j < 3; j++) {
        this.cellValue[i][j] = '';
      }
    }
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
    const initialGame = new GameBoard();
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

  getAllGames(): Observable<GameStatus[]> {
    return this.db.collection('GameStatus').snapshotChanges().pipe(map(action => {
      return action.map(doc => {
        const data = doc.payload.doc.data() as GameStatus;
        data.id = doc.payload.doc.id;
        return { ...data };
      });
    }));
  }

  //TODO get only games related for that current user.
  getAllCurrentUserGames() {
    return this.db.collection('GameStatus',
      (ref) => ref.where('oPlayer', '!=', null,)).get();
  }

  startNewGame(gameData): Promise<any> {
    return this.db.collection('GameStatus').add(gameData);
  }

  updateGameStatus(gameStatus: GameStatus): Promise<any> {
    const gameData = JSON.parse(JSON.stringify(gameStatus));
    return this.db.doc('GameStatus/' + gameStatus.id).update(gameData);
  }

  fetchGameStatus(gameId: string): Observable<GameStatus> {
    return this.db.doc<GameStatus>('GameStatus/' + gameId).valueChanges()
      .pipe(map((game: GameStatus) => {
        game.id = gameId;
        return game;
      }));
  }
}
