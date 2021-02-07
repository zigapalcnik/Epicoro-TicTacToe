import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CreateNewUserComponent } from '../../@theme/components/create-new-user/create-new-user.component';
import { take } from 'rxjs/operators';
import { LoggerFactory } from '../../@core/log/logger-factory';
import { User, UserService } from '../../@core/data/user.service';
import { Router } from '@angular/router';
import { GameService, GameStatus } from '../../@core/data/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private static logger = LoggerFactory.getLogger(HomeComponent.name);
  user: User;
  games: GameStatus[] = [];

  constructor(private readonly dialogService: NbDialogService,
              private readonly userService: UserService,
              private readonly gameService: GameService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.getAllGames();
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      this.user = user as User;
    } else {
      this.createUserDialog();
    }
  }

  get activeGames(): GameStatus[] {
    return this.games.filter(g => {
      return g.playerX && g.playerO && !g.finished;
    });
  }

  createUserDialog(): void {
    this.dialogService.open(CreateNewUserComponent, {}).onClose
      .pipe(take(1))
      .subscribe((result: string) => {
        if (result) {
          this.user = new User();
          this.user.username = result;
          this.userService.createNew({ ...this.user }).then(r => {
            // Stop loading the page.
          });
        }
      });
  }

  newGame(): void {
    const gameStatus = new GameStatus(this.user);
    const gameData = JSON.parse(JSON.stringify(gameStatus));
    this.gameService.startNewGame(gameData).then(docref => {
      if (docref) {
        this.router.navigate([`/game/${docref.id}`]);
      }
    }, () => {
      alert('Error while creating new game');
    });
  }

  getAllGames(): void {
    this.gameService.getAllGames().subscribe(games => {
      this.games = games;
    });
  }
}
