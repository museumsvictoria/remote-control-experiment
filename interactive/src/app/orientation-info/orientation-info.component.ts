import { Component, OnInit, Input } from '@angular/core';
import { DeviceOrientation } from '../models/deviceOrientation.model';

@Component({
  selector: 'orientation-info',
  templateUrl: './orientation-info.component.html',
  styleUrls: ['./orientation-info.component.css']
})
export class OrientationInfoComponent implements OnInit {

  public alpha: number;
  public beta: number;
  public gamma: number;
  public relativeAlpha: number;

  constructor() { }

  ngOnInit() {
  }

  @Input()
  set deviceOrientation(deviceOrientation: DeviceOrientation) {
    this.alpha = deviceOrientation.alpha;
    this.beta = deviceOrientation.beta;
    this.gamma = deviceOrientation.gamma;
    this.relativeAlpha = deviceOrientation.relativeAlpha;

  }

}
