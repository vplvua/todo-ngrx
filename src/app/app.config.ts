import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { loadingReducer } from './store/loading/loading.reducer';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { LoadingEffects } from './store/loading/loading.effects';
import { rootReducer } from './store/root.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([loadingInterceptor])),
    provideStore(rootReducer),
    provideEffects([LoadingEffects]),
    provideStoreDevtools(),
    provideAnimations(),
  ],
};
