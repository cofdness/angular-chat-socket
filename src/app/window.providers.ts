import {FactoryProvider, InjectionToken} from '@angular/core';

export const WINDOW = new InjectionToken<Window>('window');

// window-object can be resolved in the AOT-build use injection Token, so we can get hostname

const windowProvider: FactoryProvider = {
  provide: WINDOW,
  useFactory: () => window
};

export const WINDOW_PROVIDERS = [
  windowProvider
];
