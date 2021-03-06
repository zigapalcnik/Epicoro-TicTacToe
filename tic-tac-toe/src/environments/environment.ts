// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { ConsoleLogger } from '../app/@core/log/loggers/console-logger';
import { LogLevel } from '../app/@core/log/log-level';

export const environment = {
  logger: ConsoleLogger,
  logLevel: LogLevel.ALL,
  production: false,
  firebase: {
    apiKey: 'AIzaSyCpPORA3aX5rh10spsXRfAkQJH5xLvjQKI',
    authDomain: 'tictactoe-49a3b.firebaseapp.com',
    projectId: 'tictactoe-49a3b',
    storageBucket: 'tictactoe-49a3b.appspot.com',
    messagingSenderId: '400343774124',
    appId: '1:400343774124:web:a3e625b58d185b0c910009',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
