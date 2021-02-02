import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CreateNewUserComponent } from '../../@theme/components/create-new-user/create-new-user.component';
import { take } from 'rxjs/operators';
import { LoggerFactory } from '../../@core/log/logger-factory';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private static logger = LoggerFactory.getLogger(HomeComponent.name);

  username: string;
  constructor(private readonly dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.createUserDialog();
  }

  createUserDialog(): void {
    this.dialogService.open(CreateNewUserComponent, {
    }).onClose
      .pipe(take(1))
      .subscribe((result: string) => {
        this.username = result;
        HomeComponent.logger.info(this.username, 'Username test');
      });
  }

}
