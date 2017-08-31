import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceOrientation } from '../models/deviceOrientation.model';
import { CursorPosition } from '../models/cursorPosition.model';
import { ConfigService } from './config.service';
import { Utils } from '../utils/app.utils';
@Injectable()
export class CoordinateService {

    constructor(private config: ConfigService) {
        this.subscribeToWindowResize();
    }




    makecursorPosition(orientation: DeviceOrientation): CursorPosition {

        var c = new CursorPosition();

        c.rotation = 0;
        //  c.x = this.calculateX(orientation.alpha);
        c.x = this.calculateX(orientation.relativeAlpha);
        c.y = this.calculateY(orientation.beta);
        c.rotation = orientation.gamma;
        return c;
    }

    private subscribeToWindowResize() {
        Observable.fromEvent(window, 'resize')
            .throttleTime(500)
            .subscribe((event: any) => {
                this.config.windowWidth = event.target.innerWidth;
                this.config.windowHeight = event.target.innerHeight;
            });
    }

    private calculateX(rotation): number {

        if (rotation > this.config.maxDeviation) rotation = this.config.maxDeviation;
        if (rotation < (0 - this.config.maxDeviation)) rotation = 0 - this.config.maxDeviation;
        var percent = ((rotation + this.config.maxDeviation) / (this.config.maxDeviation * 2)) * 100;

        var position = percent / 100 * window.screen.width;
        return Math.round(position);



    }

    private calculateY(input: number): number {
        input = input * 6;

        var y = input * -1;
        y += 90;

        if (y < 0) y = 0;
        if (y > 180) y = 180;

        var multiplier = (this.config.windowHeight - this.config.cursorSize) / 180;
        y = y * multiplier;
        return Math.round(y);
    }
}