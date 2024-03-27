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
  // get the nav component to be able to handle outside click event

  // close the dropdown menu when outside click occurs
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
                        // align container center with mx-auto, set its max width to 7xl so it does not expand too much
                          "px-4 sm:px-8 lg:px-10 " + 
                        // set padding-x for device sm:4 >sm-lg<:8 >lg:10
                          "mt-4 sm:mt-8 lg:mt-10";
                        // set margin-top for device sm:4 >sm-lg<:8 >lg:10

  CardContainer: string = "flex flex-col md:flex-row items-center justify-center w-full " +
                        // set flex direction to col for devices smaller than md
                        // set flex direction to row for devices larger than md
                          "overflow-hidden " +
                        // hide the overflowed elements which in this case is the grid layout

                          "border border-1 border-gray-700 rounded-lg " +

                        // the card has a special hover effect that translates the background color partialy
                        // to be able to achieve this kind of operation I planned to enlarge the backgorund by %400
                        // and applied gradient color to it.(background-color:<Color1---to---Color2>)
                        // after that final step is positioning the background when hover occurs
                          "bg-[#151B22] bg-[size:_400%] " +

                        // for md and smaller devices background translates to left
                        // for devices larger than md it translates to right
                          "bg-gradient-to-r from-[#581b56] via-[#151B22] to-[#151B22] " +
                        // for md and smaller devices set gradient to <Purple---to---Gray>

                          "md:bg-gradient-to-r md:from-[#151B22] md:via-[#151B22] md:to-[#581b56] " +
                        // for devices larger than md set gradient to <Gray---to---Purple>

                          "bg-[position:_100%_100%] hover:bg-[position:_30%_30%] " +
                        // for md and smaller devices set background position to where gray is
                        // when hover occurs change its position to where purple is

                          "md:bg-[position:_0%_0%] md:hover:bg-[position:_60%_60%] " +
                        // for devices larger than md set background position to where gray is
                        // when hover occurs change its position to where purple is

                          "transition-all duration-500 ease-in-out";
                        // apply transition and duration with ease-in-out so that sudden hover effects are prevented

  CardTextContainer: string = "flex flex-col " +
                            // apply flex column where text elements hold
                              "p-4 sm:p-10 lg:p-16 lg:pe-28 " +
                            // apply padding for devices <sm:4, >sm_and_<lg:10, >lg:16
                              "w-full md:w-1/2 " +
                            // contain half of width for devices larger than md
                            // contain all of the width for devices smaller than md
                              "gap-10 md:gap-40 lg:gap-48";
                            // set gap between inner elements according to device viewport


  CardTextSize: string = "text-base sm:text-xl md:text-lg lg:text-2xl ";
                        // set text size according to device viewport

  CardLinkStyle: string = "flex items-center py-1 " +
                          "text-base sm:text-xl md:text-xl xl:text-2xl " +
                          "text-gray-200 font-semibold hover:underline underline-offset-8";

  CardLinkIconUrl: string = "https://img.icons8.com/ios-filled/50/e3e7ed/forward--v1.png";
  
  CardGridContainer: string = "w-full md:w-1/2 relative " +
                            // contain half of width for devices larger than md
                            // contain all of the width for devices smaller than md
                            // position attribute set to relative
                              "min-h-96 md:min-h-fit " +
                            // set min height to 480px for devices smaller than md
                            // set min height to fit(outer elements height)
                              "overflow-hidden md:overflow-visible ";
                            // hide the grid layout from neighbor element for devices smaller than md

  CardGridStyle: string = "grid gap-4 absolute rotate-[-15deg] " +
                        // position attribute set to absolute so, grid layout is able to rendered indenpendently
                        // meaning that it ignores all styling attributes but outer relative element
                        // this way it renders its elements by cousing overflow and I managed that on outer elements

                          "grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 " +
                        // set gap according to device viewport

                          "left-0 right-0 md:right-1/2 md:left-1/2 " +
                        // set position of the grid to expand on devices smaller than md
                        // set position of the grid to middle on devices larger than md
                          "w-4/5 lg:w-11/12 " +
                        // set with according to device viewport

                          "translate-x-36 sm:translate-x-24 md:-translate-x-1/3 " +
                          "translate-y-[-64px] sm:translate-y-[-72px] md:-translate-y-1/2 ";
                        // translate the position of the grid according to provided position
                        // with [-px] its position translated backwords to center the element
}
