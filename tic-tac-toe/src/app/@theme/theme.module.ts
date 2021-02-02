import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CORPORATE_THEME,
  DEFAULT_THEME,
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbIconModule,
  NbLayoutModule,
  NbThemeModule,
  NbUserModule
} from '@nebular/theme';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { OneColumnLayoutComponent } from './layouts/one-column/one-column.layout';


const BASE_MODULES = [
  CommonModule,
  FormsModule,
  RouterModule
];

const NB_MODULES = [
  NbCardModule,
  NbLayoutModule,
  NbIconModule,
  NbActionsModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule
];

const MODULES = [];

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  OneColumnLayoutComponent
];

const PIPES = [];

@NgModule({
  imports: [...BASE_MODULES, ...NB_MODULES, ...MODULES],
  exports: [...BASE_MODULES, ...NB_MODULES, ...MODULES, ...COMPONENTS, ...PIPES],
  declarations: [...COMPONENTS, ...PIPES],
  entryComponents: [],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: 'corporate',
          },
          [DEFAULT_THEME, CORPORATE_THEME],
        ).providers,
      ],
    };
  }
}
