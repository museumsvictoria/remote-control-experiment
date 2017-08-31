import { Component, OnInit, Input } from '@angular/core';
import { CursorPosition } from '../models/cursorPosition.model';

@Component({
  selector: 'cursor-info',
  templateUrl: './cursor-info.component.html',
  styleUrls: ['./cursor-info.component.css']
})
export class CursorInfoComponent implements OnInit {

  public x: number;
  public y: number;
  public rotation: number;

  constructor() { }

  ngOnInit() {
  }

  @Input()
  set cursorPosition(position: CursorPosition) {
    this.x = position.x;
    this.y = position.y;
    this.rotation = position.rotation;

  }

}
