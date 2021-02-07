import { Component, Input, OnInit } from '@angular/core';
import { GameStatus } from '../../../@core/data/game.service';
import { GameState, PlayingSign } from '../../game/game.component';
import { User } from '../../../@core/data/user.service';

@Component({
  selector: 'app-game-section',
  templateUrl: './game-section.component.html',
  styleUrls: ['./game-section.component.scss']
})
export class GameSectionComponent implements OnInit {
  @Input() game: GameStatus;
  @Input() currentUser: User
  playingSign = PlayingSign;

  constructor() {
  }

  ngOnInit(): void {
  }

  getXUserName(game: GameStatus): string {
    return `${ game.playerX?.username }`;
  }

  getYUserName(game: GameStatus): string {
    return `${ game.playerO?.username ?? 'Opponent' }`;
  }

  getXBadgeText(): string {
    if (this.game.gameState === GameState.WINNER) {
      return this.game.currentPlayerSign === PlayingSign.X ? 'Winner' : '';
    } else if (this.game.gameState === GameState.ACTIVE) {
      if (this.game.currentPlayerSign === PlayingSign.X) {
        if (this.currentUser.id === this.game.playerX.id) {
          return `Your turn`;
        } else {
          return `${ this.game.playerX.username } turn`;
        }
      }
    }
  }

  getOBadgeText(): string {
    if (this.game.gameState === GameState.WINNER) {
      return this.game.currentPlayerSign === PlayingSign.O ? 'Winner' : '';
    } else if (this.game.gameState === GameState.ACTIVE) {
      if (this.game.currentPlayerSign === PlayingSign.O) {
        if (this.currentUser.id === this.game.playerO.id) {
          return `Your turn`;
        } else {
          return `${ this.game.playerO.username } turn`;
        }
      }
    }
  }

  getClass(): string {
    let htmlClass = 'p-1 badge badge-';
    // In case game is finished and we have winner
    if (this.game.gameState === GameState.WINNER) {
      htmlClass += 'success';
    } else {
      // In case its X's turn and we are X we get warning otherwise we get info
      if (this.game.currentPlayerSign === PlayingSign.X) {
        if (this.currentUser.id === this.game.playerX.id) {
          htmlClass += 'warning'
        } else {
          htmlClass += 'info'
        }
      } else {
        if (this.currentUser.id === this.game.playerO.id) {
          htmlClass += 'warning'
        } else {
          htmlClass += 'info'
        }
      }
    }
    return htmlClass;
  }
}
