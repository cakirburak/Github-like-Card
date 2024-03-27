import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private provider = new GoogleAuthProvider();
  router = inject(Router);

  // sign up with provided information
  signUpWithEmailAndPassword(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.auth, email, password,).then(response => {
      updateProfile(response.user, { displayName: username })
    })

    // it returns an observable that wraps the promise returned by createUserWithEmailAndPassword
    return from(promise);
  }

  // sign in with credentials
  signInWithEmailAndPassword(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.auth, email, password).then(() => { });

    // it returns an observable that wraps the promise returned by signInWithEmailAndPassword
    return from(promise);
  }

  // sign in with google popup window and redirect to home
  signInWithGoogle() {
    signInWithPopup(this.auth, this.provider).then(() => {
      this.router.navigateByUrl('/');
    })
  }

  validateUsername(username: string): boolean {
    // Check if username is empty or contains whitespace or special characters
    const regex = /^[a-zA-Z0-9]+$/; // Allow only alphanumeric characters
    return !!username && !/\s/.test(username) && regex.test(username);
  }
}