import { Component, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavComponent } from '../../components/nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, NavComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {

  // LOGIC
  @ViewChild(NavComponent) navComponent: NavComponent | undefined;

  @HostListener('document:click', ['$event'])
  onClickOutsideDropDown(event: Event) {
    if (!this.navComponent?.showDropDown) {
      return;
    }
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.navComponent.showDropDown = false;
    }
  }

  // STYLES

  NavContainer: string = "mx-auto max-w-7xl px-2 sm:px-6 lg:px-8";
  NavInnerContainer: string = "flex h-16 items-center justify-between";
}
