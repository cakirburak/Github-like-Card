import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './signup.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class SignUpComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);

  errorMessage: string | null = null;
  isLoading: boolean = false;

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    this.isLoading = true;
    this.authService
      .signUpWithEmailAndPassword(rawForm.email, rawForm.username, rawForm.password)
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


}