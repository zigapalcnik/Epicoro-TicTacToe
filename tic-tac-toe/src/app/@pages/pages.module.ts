import { NgModule } from '@angular/core';
import { NbAccordionModule, NbListModule, NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';

@NgModule({
  imports: [
    ThemeModule,
    NbMenuModule,
    NbAccordionModule,
    NbListModule,
  ],
  declarations: [
    HomeComponent,
    GameComponent
  ],
})
export class PagesModule {
}
