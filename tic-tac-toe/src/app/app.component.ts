import { Component } from '@angular/core';
import { LoggerFactory } from './@core/log/logger-factory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private static logger = LoggerFactory.getLogger(AppComponent.name);
  title = 'tic-tac-toe';
  constructor() {
    AppComponent.logger.info('LOGGER TEST');
  }

}
