import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './signin.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
})
export class SignInComponent {

  // LOGIC
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
    this.authService.signInWithEmailAndPassword(rawForm.email, rawForm.password)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/');
          this.isLoading = false;
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

  // STYLES
  CentralizedContainer: string = "p-4 h-screen flex items-center justify-center";
  // set the main container height to screen height with h-screen 
  // center the container with flex properties which are items-center(horizontal) and justify-center(vertical)
  FormContainer: string = "flex flex-col min-w-96 p-6 rounded-lg bg-[#161B22]";
  // use flex-col for the form content and set its minimum width to 96

  HeaderStyle: string = "text-3xl mb-2 font-semibold text-center text-gray-300";
  InputStyle: string = "w-full h-8 ps-2 rounded-lg  bg-slate-800 text-gray-200";
  LinkStyle: string = "text-sm mt-4 ps-2 inline-block hover:underline hover:text-yellow-500 text-gray-100";
  ButtonStyle: string = "w-full h-8 rounded-lg bg-slate-600 hover:bg-yellow-600 transition-colors duration-300 text-gray-300";
  SecondartButtonStyle: string = "w-full h-8 rounded-lg bg-blue-900 hover:bg-blue-700 transition-colors duration-300 text-gray-300 ";

}