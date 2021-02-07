import { NgModule } from '@angular/core';
import { NbAccordionModule, NbListModule, NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { GameSectionComponent } from './home/game-section/game-section.component';
import { GameAccordionComponent } from './home/game-accordion/game-accordion.component';
import { HomeModule } from './home/home.module';

@NgModule({
  imports: [
    ThemeModule,
    NbMenuModule,
    NbAccordionModule,
    NbListModule,
    HomeModule,
  ],
  declarations: [
  ],
})
export class PagesModule {
}
