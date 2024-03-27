import { Routes } from '@angular/router';
import {
  AuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { SignUpComponent } from './pages/signup/signup.component';
import { SignInComponent } from './pages/signin/signin.component';
import { HomeComponent } from './pages/home/home.component';

const redirectUnauthorizedToSignIn = () => redirectUnauthorizedTo(['signin']);
const redirectSignedInToHome = () => redirectLoggedInTo(['']);

// Routes are protected with AuthGuard
// which means unauthorized requests will redirected to /signin with corresponding component
export const routes: Routes = [
  {
    path: 'signup',
    component: SignUpComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectSignedInToHome },
  },
  {
    path: 'signin',
    component: SignInComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectSignedInToHome },
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToSignIn },
  },
];