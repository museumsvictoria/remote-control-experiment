import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { DeviceOrientation } from '../models/deviceOrientation.model';
import { Injectable } from "@angular/core";

@Injectable()
export class OrientationMessageService {
   private url = 'http://' + window.location.hostname + ':8100';
  private socket;

   constructor(){
           this.socket = io(this.url);

   }

  sendConnectionStatus(status: boolean) {
    this.socket.emit('remote-orientation-connection-status', status);
  }

  sendOrientation(orientation: DeviceOrientation) {
    this.socket.emit('remote-orientation-message', orientation);
  }

  orientationMessages() : Observable<DeviceOrientation> {
    let observable = new Observable<DeviceOrientation>(observer => {
      this.socket.on('remote-orientation-message', (data : DeviceOrientation) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
    return observable;    
  }

   connectionMessages() : Observable<boolean> {
    let observable = new Observable<boolean>(observer => {
      this.socket.on('remote-orientation-connection-status', (data : boolean) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
    return observable;    
  }
}
