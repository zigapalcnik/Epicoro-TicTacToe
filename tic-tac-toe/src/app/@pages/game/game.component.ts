import { Component, OnInit } from '@angular/core';
import { GameBoard, GameService, GameStatus } from '../../@core/data/game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService } from '../../@core/data/user.service';

export enum PlayingSign{
  X = 'X',
  O = 'O',
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  currentPlayer: User;

  playerRole: string;
  winner: string;
  win = false;
  gameFinished = false;
  gameId: string;
  gameBoard = [0, 1, 2];
  game = new GameBoard();
  gameStatus = new GameStatus();

  constructor(private service: GameService,
              private userService: UserService,
              private readonly router: Router,
              private readonly route: ActivatedRoute) {
    if (this.route.snapshot.params['id']) {
      this.gameId = this.route.snapshot.paramMap.get('id');
    }
  }

  get userOnMove(): string {
    let username = '';
    if (this.gameStatus.playerO && this.gameStatus.playerX) {
      if (this.gameStatus.currentPlayer === PlayingSign.X) {
        username = this.gameStatus.playerX.username;
      } else {
        username = this.gameStatus.playerX.username;
      }
    }
    return username;
  }

  get opponentUsername(): string {
    return this.currentPlayer.id === this.gameStatus.playerX?.id ? this.gameStatus.playerO?.username : this.gameStatus.playerX?.username;
  }

  ngOnInit(): void {
    this.game = this.service.setArray();
    this.setCurrentPlayer();
    this.setPlayerResponsibleForNextMove();

    this.service.fetchGameStatus(this.gameId)
      .subscribe((result: GameStatus) => {
        this.gameStatus = result;
        this.setBoard();
        if (!this.gameFinished) {
          this.setPlayersAndCurrentRole();
        }
      });

  }

  setPlayersAndCurrentRole() {
    if (!this.gameStatus.playerX && (this.gameStatus?.playerO.id != this.currentPlayer.id)) {
      this.gameStatus.playerX = this.currentPlayer;
      this.service.updateGameStatus(this.gameId, this.gameStatus, this.game);
    } else if (!this.gameStatus.playerO && (this.gameStatus?.playerX.id != this.currentPlayer.id)) {
      this.gameStatus.playerO = this.currentPlayer;
      this.service.updateGameStatus(this.gameId, this.gameStatus, this.game);
    } else if (this.gameStatus.playerX && this.gameStatus.playerO) {
      if (this.gameStatus.playerX.id === this.currentPlayer.id) {
        this.playerRole = PlayingSign.X;
      } else {
        this.playerRole = PlayingSign.O;
      }
    }
  }

  setCellValue(row: number, col: number) {
    if (!this.win) {
      if (!(this.gameStatus.playerO && this.gameStatus.playerX)) {
        alert('Wait of another player');
      } else {
        if (this.gameStatus.currentPlayer != this.playerRole) {
          alert('The player ' + this.gameStatus.currentPlayer + ' has not yet played.\nPlease wait for your turn.');
        } else if (this.game.cellValue[row][col] == '') {
          this.game.cellValue[row][col] = this.gameStatus.currentPlayer;
          this.service.updateGameStatus(this.gameId, this.gameStatus, this.game);
        }
      }
    }
  }

  setBoard() {
    this.game.cellValue[0] = this.gameStatus.row0;
    this.game.cellValue[1] = this.gameStatus.row1;
    this.game.cellValue[2] = this.gameStatus.row2;

    this.win = this.isGameWon(this.game);
    this.setPlayerResponsibleForNextMove();

    if (this.win) {
      if (this.gameStatus?.currentPlayer === PlayingSign.X) {
        this.winner = this.gameStatus.playerX.username;
      } else {
        this.winner = this.gameStatus.playerX.username;
      }
      this.gameFinished = false;
    }
  }

  setPlayerResponsibleForNextMove(): void {
    let sum = 0;
    for (let i = 0; i < 3; i++) {
      sum += this.game.cellValue[i].filter(String).length;
    }
    if (!this.win) {
      if (sum % 2 == 0) {
        this.gameStatus.currentPlayer = PlayingSign.X;
      } else {
        this.gameStatus.currentPlayer = PlayingSign.O;
      }
      this.gameFinished = sum === 9;
    }
  }

  setCurrentPlayer() {
    const user = this.userService.currentUser();
    if (user) {
      this.currentPlayer = user;
    } else {
      this.router.navigate(['']);
    }
  }

  isGameWon(game: GameBoard): boolean {
    let win = false;
    for (let i = 0; i < 3; i++) {
      // Check for winning on row
      if ((game.cellValue[i][0] == game.cellValue[i][1]) && (game.cellValue[i][1] == game.cellValue[i][2]) && game.cellValue[i][0] != '') {
        win = true;
      }
      // Check for winning on column
      else if ((game.cellValue[0][i] == game.cellValue[1][i]) && (game.cellValue[1][i] == game.cellValue[2][i]) && game.cellValue[0][i] != '') {
        win = true;
      }
    }

    // Check for winning on diagonal
    if ((game.cellValue[0][0] == game.cellValue[1][1]) && (game.cellValue[1][1] == game.cellValue[2][2]) && game.cellValue[0][0] != '') {
      win = true;

    } else if ((game.cellValue[0][2] == game.cellValue[1][1]) && (game.cellValue[1][1] == game.cellValue[2][0]) && game.cellValue[0][2] != '') {
      win = true;
    }

    return win;
  }
}

