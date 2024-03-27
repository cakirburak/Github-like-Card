import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth, User, getAuth } from '@angular/fire/auth';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {

  // LOGIC

  private auth: Auth = inject(Auth);
  router = inject(Router);
  currentUser!: User | null;
  currentUserProfileUrl!: string | null;

  // on component initialization get the current authenticated user and set its profilePhotoUrl
  ngOnInit(): void {
    this.currentUser = getAuth().currentUser;

    if (this.currentUser?.photoURL) {
      this.currentUserProfileUrl = this.currentUser?.photoURL;
      // this occurs when user signs in with Google
    } else {
      this.currentUserProfileUrl = "https://img.icons8.com/carbon-copy/100/FFFFFF/gender-neutral-user.png";
    }
  };

  // sign out handler: signs out the current authenticated user
  // redirects to signin page. if it fails, logs the error
  signOut() {
    this.auth.signOut().then(() => {
      console.log("User logged out successfully");
      this.router.navigateByUrl('/signin');
    }).catch((err) => {
      console.error("Error logging out:", err);
    });
  }

  // drop down menu handler onClick
  showDropDown: boolean = false;
  handleDropDown() {
    this.showDropDown = !this.showDropDown;
  }

  // STYLES

  NavContainer: string = "mx-auto max-w-7xl px-2 sm:px-6 lg:px-8";
                      // center the navbar with mx-auto
                      // set its max-w to 7xl so it does not expand too much on desktop view
                      // set breakpoints for small and large devices to padding-x value

  NavInnerContainer: string = "flex h-16 items-center justify-between";
                            // use flex for aligning navbar to center both  horizontal(items-center) and vertical(justify-between)
                            // set its height to 16

}
