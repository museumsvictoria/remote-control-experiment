import { Injectable } from '@angular/core';
@Injectable()
export class ConfigService {
        windowWidth: number;
        windowHeight: number;
        // arcWidth: number;
        maxDeviation: number;
        xOffset: number; // angle between screen centre and magnetic north
        cursorSize: number;

        constructor(){
            this.windowWidth = 0;
            this.windowWidth = 0;
            //this.arcWidth = 60
            this.maxDeviation = 30
            this.xOffset=30;
            this.cursorSize = 50;
        }
}