import { Component, OnInit, Input, ElementRef, HostListener } from '@angular/core';
import { CursorPosition } from '../models/cursorPosition.model';

@Component({
  selector: 'app-grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.css'],
})
export class GridItemComponent implements OnInit {

  public bottom: number;
  public left: number;
  public right: number;
  public top: number;
  public width: number;

  constructor(private myElement: ElementRef) {
    this.onWindowResize();
  } 
  
   ngOnInit() {
  }


public text: string;

public selected: boolean;
private resizeTimeout : any;

  @Input()
  set cursorPosition(position: CursorPosition) {

   if(position !==undefined && position !==null)
   {
     this.selected = (  (position.y > this.top && position.y < this.bottom) &&  (position.x > this.left && position.x < this.right));
 

   } 

  }

  refresh() {
    var r = this.myElement.nativeElement.getBoundingClientRect();
    this.bottom = r.bottom;
    this.left = r.left;
    this.right = r.right;
    this.top = r.top;
    this.width = r.width;
    this.text = `${this.bottom} ${this.left} ${this.right} ${this.top} ${this.width} `;
  }

@HostListener('window:resize')
    onWindowResize() {
       this.refresh();
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        this.resizeTimeout = setTimeout((() => {
            this.refresh(); 
        }).bind(this), 1000);
    }



}
