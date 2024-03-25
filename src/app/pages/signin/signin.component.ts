import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './signin.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class SignInComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);


  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  errorMessage: string | null = null;
  isLoading: boolean = false;

  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    this.isLoading = true;
    this.authService
      .signInWithEmailAndPassword(rawForm.email, rawForm.password)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.code;
        },
      });
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }
}