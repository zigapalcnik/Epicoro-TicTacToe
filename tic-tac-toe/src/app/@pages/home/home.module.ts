import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { GameComponent } from '../game/game.component';
import { GameSectionComponent } from './game-section/game-section.component';
import { ThemeModule } from '../../@theme/theme.module';
import { OpenGamesComponent } from './open-games/open-games.component';
import { ActiveGamesComponent } from './active-games/active-games.component';
import { FinishedGamesComponent } from './finished-games/finished-games.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    HomeComponent,
    GameComponent,
    GameSectionComponent,
    OpenGamesComponent,
    ActiveGamesComponent,
    FinishedGamesComponent
  ],
})
export class HomeModule {
}
