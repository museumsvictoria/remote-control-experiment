import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DeviceComponent } from './device/device.component';
import { ScreenComponent } from './screen/screen.component';
import { RouterModule } from "@angular/router";
import { routes } from './app.routes';

import { CoordinateService } from './services/coordinate.service';
import { ConfigService } from './services/config.service';
import { OrientationMessageService } from './services/orientationMessage.service';

import { RelativeOrientationService } from './services/relative-orientation.service';
import { OrientationInfoComponent } from './orientation-info/orientation-info.component';
import { CursorInfoComponent } from './cursor-info/cursor-info.component';
import { GridItemComponent } from './grid-item/grid-item.component';
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./pageNotFound/pageNotFound.component";


export class MyHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
      // override hammerjs default configuration
            'press': {time: 100, threshold:300},

/*      'swipe': {
           velocity: 0.4,
           threshold: 20,
           direction: 31 // /!\ ugly hack to allow swipe in all direction
      }*/
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,  
    PageNotFoundComponent,
    DeviceComponent,
    ScreenComponent,
    OrientationInfoComponent,
    OrientationInfoComponent,
    CursorInfoComponent,
    CursorInfoComponent,
    CursorInfoComponent,
    CursorInfoComponent,
    GridItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [OrientationMessageService, CoordinateService, ConfigService, RelativeOrientationService, { 
                    provide: HAMMER_GESTURE_CONFIG, 
                    useClass: MyHammerConfig 
                }],
  bootstrap: [AppComponent]
})
export class AppModule { }


