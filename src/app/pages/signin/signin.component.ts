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
  // inject FormBuilder to handle input values
  router = inject(Router);
  // Router for redirection
  authService = inject(AuthService);
  // AuthService for authentication functionalities

  // get form inputs with corresponding attributes
  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  // these variables is used to manage the view acording to submit response
  errorMessage: string | null = null;
  isLoading: boolean = false;

  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    // convert form to JSON object
    this.isLoading = true;
    // set loading to true so that loading animation can be rendered
    
    this.authService.signInWithEmailAndPassword(rawForm.email, rawForm.password)
      .subscribe({
        next: () => { // if sign in successful redirect to home page and reset the loading animation
          this.router.navigateByUrl('/');
          this.isLoading = false;
        },
        error: (err) => { // if sign in failed reset the loading animation and set the error
          this.isLoading = false;
          this.errorMessage = err.code;
        },
      });
  }

  // sign in with google using AuthService
  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }

  // STYLES
  
  CentralizedContainer: string = "p-4 h-screen flex items-center justify-center";
  // set the main container height to screen height with h-screen 
  // center the container with flex properties which are items-center(horizontal) and justify-center(vertical)
  FormContainer: string = "flex flex-col min-w-80 sm:min-w-96  p-6 rounded-lg bg-[#161B22]";
  // use flex-col for the form content
  // for RESPONSIVE design use min-w-80 for small devices, min-w-96 for devices that larger than small viewport

  HeaderStyle: string = "text-3xl mb-2 font-semibold text-center text-gray-300";
  InputStyle: string = "w-full h-8 ps-2 rounded-lg  bg-slate-800 text-gray-200";
  LinkStyle: string = "text-sm mt-4 ps-2 inline-block hover:underline hover:text-[#ba0048] text-gray-100";
  
  ButtonStyle: string = "w-full h-8 rounded-lg bg-slate-600 hover:bg-[#ba0048] transition-colors duration-300 text-gray-300";
  SecondartButtonStyle: string = "w-full h-8 rounded-lg bg-blue-900 hover:bg-blue-700 transition-colors duration-300 text-gray-300 ";
  // with transition-colors and duration-300 sudden hover effects are prevented

}