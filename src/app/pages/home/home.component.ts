import { Component, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavComponent } from '../../components/nav/nav.component';
import { GridCardComponent } from '../../components/grid-card/grid-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, NavComponent, GridCardComponent],
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

  HomeContainer: string = "mx-auto max-w-7xl " +
                          "px-4 sm:px-8 lg:px-10 " + 
                          "mt-4 sm:mt-8 lg:mt-10";

  CardContainer: string = "flex flex-col md:flex-row items-center justify-center w-full " +
                          "overflow-hidden " +
                          "bg-[size:_400%] " +
                          "bg-[#151B22] border border-1 border-gray-700 rounded-lg " +
                          "bg-gradient-to-r from-[#471045] via-[#151B22] to-[#151B22] " +
                          "bg-[position:_100%_100%] hover:bg-[position:_25%_25%] " +
                          "md:bg-gradient-to-r md:from-[#151B22] md:via-[#151B22] md:to-[#471045] " +
                          "md:bg-[position:_0%_0%] md:hover:bg-[position:_60%_60%] " +
                          "transition-all duration-[600ms] ";

  CardTextContainer: string = "flex flex-col " +
                              "p-4 sm:p-10 lg:p-16 lg:pe-28 " +
                              "w-full md:w-1/2 " +
                              "gap-10 md:gap-40 lg:gap-48";

  CardTextSize: string = "text-base sm:text-xl md:text-lg lg:text-2xl ";
  
  CardLinkStyle: string = "flex items-center py-1 " +
                          this.CardTextSize +
                          "text-gray-200 font-semibold hover:underline underline-offset-8";

  CardLinkIconUrl: string = "https://img.icons8.com/ios-filled/50/e3e7ed/forward--v1.png";
  
  CardGridContainer: string = "w-full md:w-1/2 relative " +
                              "min-h-96 md:min-h-fit " +
                              "overflow-hidden md:overflow-visible ";

  CardGridStyle: string = "grid gap-4 absolute rotate-[-15deg] " +
                          "grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 " +
                          "right-0 " +
                          "-translate-x-0 sm:-translate-x-[30px] md:-translate-x-[-24px] " +
                          "-translate-y-1/3 sm:-translate-y-1/4 md:-translate-y-1/2 lg:-translate-y-[350px] ";
  
}
