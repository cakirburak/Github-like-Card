import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);

  signUpWithEmailAndPassword(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.auth,
      email,
      password,
    ).then(response => updateProfile(response.user, { displayName: username }))

    return from(promise);
  }

  signInWithEmailAndPassword(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.auth,
      email,
      password
    ).then(() => { });

    return from(promise);
  }
}