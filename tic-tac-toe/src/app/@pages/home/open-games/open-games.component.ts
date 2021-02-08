import { Component, Input } from '@angular/core';
import { GameStatus } from '../../../@core/data/game.service';
import { User } from '../../../@core/data/user.service';

@Component({
  selector: 'app-open-games',
  templateUrl: './open-games.component.html',
  styleUrls: ['./open-games.component.scss']
})
export class OpenGamesComponent {
  @Input() openGames: GameStatus[];
  @Input() user: User;
}
