import { Component, OnInit } from '@angular/core';
import { GameBoard, GameService, GameState, GameStatus, PlayingSign } from '../../@core/data/game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService } from '../../@core/data/user.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  gameState = GameState;
  currentPlayer: User;

  winner: string;
  gameId: string;
  gameBoard = [0, 1, 2];
  game = new GameBoard();
  gameStatus: GameStatus;

  constructor(private service: GameService,
              private userService: UserService,
              private readonly router: Router,
              private readonly route: ActivatedRoute) {
    if (this.route.snapshot.params['id']) {
      this.gameId = this.route.snapshot.paramMap.get('id');
    }
  }

  getActiveBadge(isText: boolean = true): string {
    if (this.gameStatus.playerO && this.gameStatus.playerX) {
      if (this.gameStatus.currentPlayerSign === PlayingSign.X) {
        if (this.currentPlayer.id === this.gameStatus.playerX.id) {
          return isText ? 'Your turn' : 'badge badge-warning';
        } else {
          return isText ? `${this.gameStatus.playerX.username} turn` : 'badge badge-info';
        }
      } else {
        if (this.currentPlayer.id === this.gameStatus.playerO.id) {
          return isText ? 'Your turn' : 'badge badge-warning';
        } else {
          return isText ? `${this.gameStatus.playerO.username} turn` : 'badge badge-info';
        }
      }
    } else {
      return isText ? 'Waiting for player' : 'badge badge-secondary';
    }
  }

  getWinnerBadge(isText: boolean = true): string {
    if (this.gameStatus.currentPlayerSign === PlayingSign.X) {
      if (this.currentPlayer.id === this.gameStatus.playerX.id) {
        return isText ? 'You won!' : 'badge badge-success';
      } else {
        return isText ? 'You lost!' : 'badge badge-danger';
      }
    } else {
      if (this.currentPlayer.id === this.gameStatus.playerO.id) {
        return isText ? 'You won!' : 'badge badge-success';
      } else {
        return isText ? 'You lost!' : 'badge badge-danger';
      }
    }
  }

  get activeBadgeClass(): string {
    if (this.gameStatus.playerO && this.gameStatus.playerX) {
      if (this.gameStatus.currentPlayerSign === PlayingSign.X) {
        return this.currentPlayer.id === this.gameStatus.playerX.id ?
          'badge badge-warning' : 'badge badge-info';
      } else {
        return this.currentPlayer.id === this.gameStatus.playerO.id ?
          'badge badge-warning' : 'badge badge-info';
      }
    } else {
      return '';
    }
  }

  get opponentUsername(): string {
    if (!this.gameStatus?.playerX || !this.gameStatus?.playerO) {
      return 'Opponent';
    }
    return this.currentPlayer.id === this.gameStatus?.playerX?.id ?
      `${this.gameStatus?.playerO?.username} - O` : `${this.gameStatus?.playerX?.username} - X`;
  }

  ngOnInit(): void {
    this.setCurrentPlayer();

    this.service.fetchGameStatus(this.gameId)
      .subscribe((result: GameStatus) => {
        this.gameStatus = result;
        this.setBoard();
        if (this.gameStatus.gameState === GameState.ACTIVE) {
          this.setPlayers();
        } else if (this.gameStatus.gameState === GameState.WINNER) {
          this.setWinner();
        }
      });
  }

  setPlayers(): void {
    if (!this.gameStatus.playerX && (this.gameStatus?.playerO.id !== this.currentPlayer.id)) {
      this.gameStatus.playerX = this.currentPlayer;
      this.updateGameBoard();
      this.updateGameStatus();
      this.service.updateGameStatus(this.gameStatus);
    } else if (!this.gameStatus.playerO && (this.gameStatus?.playerX.id !== this.currentPlayer.id)) {
      this.gameStatus.playerO = this.currentPlayer;
      this.updateGameStatus();
      this.service.updateGameStatus(this.gameStatus);
    }
  }

  setCellValue(row: number, col: number): void {
    if (this.gameStatus.gameState === GameState.ACTIVE) {
      if (!(this.gameStatus.playerO && this.gameStatus.playerX)) {
        alert('Wait of another player');
      } else {
        if ((this.gameStatus.playerX.id === this.currentPlayer.id) && (this.gameStatus.currentPlayerSign !== PlayingSign.X) ||
          (this.gameStatus.playerO.id === this.currentPlayer.id) && (this.gameStatus.currentPlayerSign !== PlayingSign.O)) {
          alert(`The player ${ this.opponentUsername } - ${ this.gameStatus.currentPlayerSign } has not yet played yet.\nPlease wait for your turn.`);
        } else if (this.game.cellValue[row][col] === '') {
          this.game.cellValue[row][col] = this.gameStatus.currentPlayerSign;
          this.updateGameStatus();
          this.service.updateGameStatus(this.gameStatus);
        }
      }
    }
  }

  updateGameBoard(): void {
    this.gameStatus.row0 = this.game.cellValue[0];
    this.gameStatus.row1 = this.game.cellValue[1];
    this.gameStatus.row2 = this.game.cellValue[2];
  }

  updateGameStatus(): void {
    if (this.isGameWon(this.game)) {
      this.gameStatus.gameState = GameState.WINNER;
    } else if (this.isGameDraw()) {
      this.gameStatus.gameState = GameState.DRAW;
    } else {
      this.setPlayerResponsibleForNextMove();
      this.gameStatus.gameState = GameState.ACTIVE;
    }
  }

  setBoard(): void {
    this.game.cellValue[0] = this.gameStatus.row0;
    this.game.cellValue[1] = this.gameStatus.row1;
    this.game.cellValue[2] = this.gameStatus.row2;
  }

  setPlayerResponsibleForNextMove(): void {
    let sum = 0;
    for (let i = 0; i < 3; i++) {
      sum += this.game.cellValue[i].filter(String).length;
    }
    if (sum % 2 === 0) {
      this.gameStatus.currentPlayerSign = PlayingSign.X;
    } else {
      this.gameStatus.currentPlayerSign = PlayingSign.O;
    }
  }

  setWinner(): void {
    if (this.gameStatus?.currentPlayerSign === PlayingSign.X) {
      this.winner = this.gameStatus.playerX.username;
    } else {
      this.winner = this.gameStatus.playerO.username;
    }
  }

  setCurrentPlayer(): void {
    const user = this.userService.currentUser();
    if (user) {
      this.currentPlayer = user;
    } else {
      this.router.navigate(['']);
    }
  }

  isGameDraw(): boolean {
    let sum = 0;
    for (let i = 0; i < 3; i++) {
      sum += this.game.cellValue[i].filter(String).length;
    }
    return sum === 9;
  }

  isGameWon(game: GameBoard): boolean {
    let win = false;
    for (let i = 0; i < 3; i++) {
      // Check for winning on row
      if ((game.cellValue[i][0] === game.cellValue[i][1]) &&
        (game.cellValue[i][1] === game.cellValue[i][2]) &&
        game.cellValue[i][0] !== '') {
        win = true;

        // Check for winning on column
      } else if ((game.cellValue[0][i] === game.cellValue[1][i]) &&
        (game.cellValue[1][i] === game.cellValue[2][i]) &&
        game.cellValue[0][i] !== '') {
        win = true;
      }
    }

    // Check for winning on diagonal
    if ((game.cellValue[0][0] === game.cellValue[1][1]) &&
      (game.cellValue[1][1] === game.cellValue[2][2]) &&
      game.cellValue[0][0] !== '') {
      win = true;

    } else if ((game.cellValue[0][2] === game.cellValue[1][1]) &&
      (game.cellValue[1][1] === game.cellValue[2][0]) &&
      game.cellValue[0][2] !== '') {
      win = true;
    }

    return win;
  }
}

