import { NgModule } from '@angular/core';
import { NbAccordionModule, NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    ThemeModule,
    NbMenuModule,
    NbAccordionModule,
  ],
  declarations: [
    HomeComponent
  ],
})
export class PagesModule {
}
