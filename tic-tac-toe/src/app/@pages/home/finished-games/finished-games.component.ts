import { Component, Input } from '@angular/core';
import { GameState, GameStatus, PlayingSign } from '../../../@core/data/game.service';
import { User } from '../../../@core/data/user.service';

@Component({
  selector: 'app-finished-games',
  templateUrl: './finished-games.component.html',
  styleUrls: ['./finished-games.component.scss']
})
export class FinishedGamesComponent {
  @Input() games: GameStatus[];
  @Input() user: User;

  getXUserName(game: GameStatus): string {
    return `${ game.playerX?.username }`;
  }

  getYUserName(game: GameStatus): string {
    return `${ game.playerO?.username ?? 'Opponent' }`;
  }

  getXBadge(game: GameStatus, isText: boolean = true): string {
    if (game.playerX?.id === this.user.id) {
      if (game.gameState === GameState.DRAW) {
        return isText ? 'Draw': 'p-1 badge badge-warning';
      } else {
        if (game.currentPlayerSign === PlayingSign.X) {
          return isText ? 'You won :-)': 'p-1 badge badge-success';
        } else {
          return isText ? 'You lost!': 'p-1 badge badge-danger';
        }
      }
    }
    return '';
  }

  getYBadge(game: GameStatus, isText: boolean = true): string {
    if (game.playerO?.id === this.user.id) {
      if (game.gameState === GameState.DRAW) {
        return isText ? 'Draw': 'p-1 badge badge-warning';
      } else {
        if (game.currentPlayerSign === PlayingSign.O) {
          return isText ? 'You won :-)': 'p-1 badge badge-success';
        } else {
          return isText ? 'You lost!': 'p-1 badge badge-danger';
        }
      }
    }
    return '';
  }
}
