import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideAuth(() => getAuth())
    ]), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"github-like-card","appId":"1:644182258645:web:46c449d41fb8bbd7dfc35c","storageBucket":"github-like-card.appspot.com","apiKey":"AIzaSyB02RP1x-UXcsQRSm8F1dSlh0uU5TTjcG8","authDomain":"github-like-card.firebaseapp.com","messagingSenderId":"644182258645"}))), importProvidersFrom(provideAuth(() => getAuth())),
  ]
};
