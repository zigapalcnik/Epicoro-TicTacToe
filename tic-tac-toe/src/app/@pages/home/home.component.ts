import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CreateNewUserComponent } from '../../@theme/components/create-new-user/create-new-user.component';
import { take } from 'rxjs/operators';
import { LoggerFactory } from '../../@core/log/logger-factory';
import { User, UserService } from '../../@core/data/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private static logger = LoggerFactory.getLogger(HomeComponent.name);
  user: User

  constructor(private readonly dialogService: NbDialogService,
              private readonly userService: UserService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      this.user = user as User;
    } else {
      this.createUserDialog();
    }
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
    this.router.navigate(['/game/']);
  }
}
