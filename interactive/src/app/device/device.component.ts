import { Component, OnInit, HostListener } from '@angular/core';
import { DeviceOrientation } from '../models/deviceOrientation.model';
import { Observable } from 'rxjs';
import { Utils } from '../utils/app.utils';
import { OrientationMessageService } from '../services/orientationMessage.service';
import { CompassUtils } from "../utils/compass.utils";

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  public deviceOrientation: DeviceOrientation = new DeviceOrientation();
  public transmitting: boolean = false;
  public initialAlpha: number | null;

  constructor(private orientationService: OrientationMessageService) {
    this.orientationService.sendOrientation(this.deviceOrientation);
    this.initialAlpha = null;
    this.subscribeToDeviceOrientation();

  }

  ngOnInit() {

  }

  private subscribeToDeviceOrientation() {
    Observable.fromEvent(window, 'deviceorientation')
      .throttleTime(30)
      .subscribe((event: DeviceOrientationEvent) => {
        this.onDeviceOrientation(event);
      });
  }

  private onDeviceOrientation(event: DeviceOrientationEvent) {

    if (!this.transmitting)
      return;

    this.deviceOrientation = this.makeDeviceOrientation(event);

    this.orientationService.sendOrientation(this.deviceOrientation);
  }

  private makeDeviceOrientation(event: DeviceOrientationEvent) : DeviceOrientation {
    if (this.initialAlpha == null) {
      this.initialAlpha = event.alpha;
    }

    var d = new DeviceOrientation();

    d.alpha = Utils.round(event.alpha, 1);
    d.beta = Utils.round(event.beta, 1);
    d.gamma = Utils.round(event.gamma, 1);
    d.relativeAlpha = Utils.round(CompassUtils.GetDeltaAngle(this.initialAlpha, event.alpha), 1);

    return d;
  }

  startTransmitting() {
    this.initialAlpha = null;
    this.transmitting = true;
    this.orientationService.sendConnectionStatus(true);
  }

  stopTransmitting() {
    this.transmitting = false;
    this.orientationService.sendConnectionStatus(false);
  }


  @HostListener('window:pressup')
  pressUp() {
    this.stopTransmitting();
  }

  @HostListener('window:pan')
  pan() {
    this.stopTransmitting();
  }

  @HostListener('window:mouseup')
  mouseup() {
    this.stopTransmitting();
  }

  @HostListener('window:tap')
  tap() {
    this.stopTransmitting();
  }





}
