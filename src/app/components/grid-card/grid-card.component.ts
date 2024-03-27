import { Component } from '@angular/core';

@Component({
  selector: 'app-grid-card',
  standalone: true,
  imports: [],
  templateUrl: './grid-card.component.html',
})
export class GridCardComponent {

  // STYLES

  CardSyle: string = "flex flex-col items-center border border-1 border-gray-700 rounded-lg bg-[#161B22] " +
                    // flex is used for aligning card elements vertical(items-center)
                     "p-3 md:py-4 md:px-5 ";

  CardImgUrl: string = "https://img.freepik.com/premium-photo/sticker-dog-with-red-scarf-that-says-dog-it_900101-35539.jpg";
  ButtonStyle: string = "flex gap-2 px-3 py-1 items-center justify-center " + 
                      // flex is used for aligning button elements both horizontal(items-center) and vertical(justify-center)
                        "bg-[#21262C] hover:bg-[#30363C] border border-1 border-gray-700 hover:border-gray-400 rounded-lg " +
                        "transition-colors duration-300";
                      // sudden hover effects are prevented with transition and duration attributes

  ButtonIconUrl: string = "https://img.icons8.com/windows/32/e3e7ed/like--v1.png";
}
