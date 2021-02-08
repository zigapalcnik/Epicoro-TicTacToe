import { NgModule } from '@angular/core';
import { NbAccordionModule, NbListModule, NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
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
