import { Component, Input } from '@angular/core';
import { GameStatus } from '../../../@core/data/game.service';
import { User } from '../../../@core/data/user.service';

@Component({
  selector: 'app-game-accordion',
  templateUrl: './game-accordion.component.html',
  styleUrls: ['./game-accordion.component.scss']
})
export class GameAccordionComponent {
  @Input() games: GameStatus[];
  @Input() title: string;
  @Input() currentUser: User
}
