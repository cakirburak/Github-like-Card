import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth, User, getAuth } from '@angular/fire/auth';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private auth: Auth = inject(Auth);

  currentUser!: User | null;
  router = inject(Router);

  ngOnInit(): void {
    this.currentUser = getAuth().currentUser;
  };

  logout() {
    this.auth.signOut().then(() => {
      console.log("User logged out successfully");
      this.router.navigateByUrl('/signin');
    }).catch((err) => {
      console.error("Error logging out:", err);
    });
  }
}
