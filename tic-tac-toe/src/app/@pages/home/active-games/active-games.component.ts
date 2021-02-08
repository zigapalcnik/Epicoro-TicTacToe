import { Component, Input } from '@angular/core';
import { GameStatus } from '../../../@core/data/game.service';
import { User } from '../../../@core/data/user.service';
import { GameState, PlayingSign } from '../../game/game.component';

@Component({
  selector: 'app-active-games',
  templateUrl: './active-games.component.html',
  styleUrls: ['./active-games.component.scss']
})
export class ActiveGamesComponent {
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
      if (game.currentPlayerSign === PlayingSign.X) {
          return isText ? `Your turn!` : 'p-1 badge badge-warning';
        } else {
        return isText ? `${ game.playerO.username } turn`: 'p-1 badge badge-info';
      }
    }
    return '';
  }

  getOBadge(game: GameStatus, isText: boolean = true): string {
    if (game.playerO?.id === this.user.id) {
      if (game.currentPlayerSign === PlayingSign.O) {
        return isText ? `Your turn!` : 'p-1 badge badge-warning';
      } else {
        return isText ? `${ game.playerX.username } turn` : 'p-1 badge badge-info';
      }
    }
    return '';
  }
}
