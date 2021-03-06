import { Component } from '@angular/core';
import { LoggerFactory } from '../../../@core/log/logger-factory';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private static logger = LoggerFactory.getLogger(HeaderComponent.name);
}
