import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { GameComponent } from '../game/game.component';
import { GameSectionComponent } from './game-section/game-section.component';
import { GameAccordionComponent } from './game-accordion/game-accordion.component';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    HomeComponent,
    GameComponent,
    GameSectionComponent,
    GameAccordionComponent
  ],
})
export class HomeModule {
}
