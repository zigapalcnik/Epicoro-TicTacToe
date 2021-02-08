import { Component, Input } from '@angular/core';
import { GameStatus } from '../../../@core/data/game.service';
import { User } from '../../../@core/data/user.service';

@Component({
  selector: 'app-active-games',
  templateUrl: './active-games.component.html',
  styleUrls: ['./active-games.component.scss']
})
export class ActiveGamesComponent {
  @Input() games: GameStatus[];
  @Input() user: User;
}
