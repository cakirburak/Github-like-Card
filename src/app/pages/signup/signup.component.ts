import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './signup.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
})
export class SignUpComponent {

  // LOGIC

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

    // if username is invalid set the error and return
    if (!this.authService.validateUsername(rawForm.username)) {
      this.isLoading = false;
      this.errorMessage = "auth/invalid-username";
      return;
    }

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

  // STYLES

  CentralizedContainer: string = "p-4 h-screen flex items-center justify-center";
  // set the main container height to screen height with h-screen 
  // center the container with flex properties which are items-center(horizontal) and justify-center(vertical)
  FormContainer: string = "flex flex-col min-w-80 sm:min-w-96  p-6 rounded-lg bg-[#161B22]";
  // use flex-col for the form content
  // for the RESPONSIVE design use min-w-80 for small devices, min-w-96 for larger devices 

  HeaderStyle: string = "text-3xl mb-2 font-semibold text-center text-gray-300";
  InputStyle: string = "w-full h-8 ps-2 rounded-lg  bg-slate-800 text-gray-200";
  LinkStyle: string = "text-sm mt-4 ps-2 inline-block hover:underline hover:text-[#ba0048] text-gray-100";
  ButtonStyle: string = "w-full h-8 rounded-lg bg-slate-600 hover:bg-[#ba0048] transition-colors duration-300 text-gray-300";

}