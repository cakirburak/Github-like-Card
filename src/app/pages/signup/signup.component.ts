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
  // inject FormBuilder to handle input values
  router = inject(Router);
  // Router for redirection
  authService = inject(AuthService);
  // AuthService for authentication functionalities

  // these variables is used to manage the view acording to submit response
  errorMessage: string | null = null;
  isLoading: boolean = false;

  // get form inputs with corresponding attributes
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    // convert form to JSON object
    this.isLoading = true;
    // set loading to true so that loading animation can be rendered

    // if username is invalid set the error and return
    if (!this.authService.validateUsername(rawForm.username)) {
      this.isLoading = false;
      this.errorMessage = "auth/invalid-username";
      return;
    }

    this.authService
      .signUpWithEmailAndPassword(rawForm.email, rawForm.username, rawForm.password) // s
      .subscribe({
        next: () => { // if sign up successful redirect to home page and reset loading animation
          this.router.navigateByUrl('/');
          this.isLoading = false;
        },
        error: (err) => { // if sign up failed reset loading animation and set the error 
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
  // with transition-colors and duration-300 sudden hover effects are prevented

}