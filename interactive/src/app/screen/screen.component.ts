import { Component, OnInit } from '@angular/core';
import { OrientationMessageService } from '../services/orientationMessage.service';
import { DeviceOrientation } from '../models/deviceOrientation.model';
import { Observable, Subscription } from 'rxjs';
import { CursorPosition } from '../models/cursorPosition.model';
import { CoordinateService } from '../services/coordinate.service';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent implements OnInit {

  public deviceOrientation: DeviceOrientation;
  public cursorPosition: CursorPosition;
  private initialAlpha: number | null;
  private orientationMessagesSubscription: Subscription;
  private connectionMessagesSubscription: Subscription;


  constructor(private orientationService: OrientationMessageService, private coordinateService: CoordinateService, private config: ConfigService) {
    this.config.windowHeight = (window.screen.height);
    this.config.windowWidth = (window.screen.width);
  }

  ngOnInit() {
    this.orientationMessagesSubscription = this.orientationService.orientationMessages().subscribe(t => this.onRemoteOrientationMessage(t));
    this.connectionMessagesSubscription = this.orientationService.connectionMessages().subscribe(t => this.onRemoteConnectionMessage(t));
  }

  ngOnDestroy() {
    this.orientationMessagesSubscription.unsubscribe();
    this.connectionMessagesSubscription.unsubscribe();
  }

  private onRemoteOrientationMessage(message: DeviceOrientation) {
    if (message.alpha) {
      this.deviceOrientation = message;
      this.cursorPosition = this.coordinateService.makecursorPosition(message);
    }
  }


  private onRemoteConnectionMessage(connected: boolean) {
    if (!connected)
      this.deviceOrientation = null;
    this.cursorPosition = null;
  }

}