import { Component } from '@angular/core';
import { LoggerFactory } from './@core/log/logger-factory';

@Component({
  selector: 'app-root',
  template: `
    <app-one-column-layout>
      <router-outlet></router-outlet>
    </app-one-column-layout>
  `,
})
export class AppComponent {
  private static logger = LoggerFactory.getLogger(AppComponent.name);

  constructor() {
    AppComponent.logger.info('LOGGER TEST');
  }

}
