import { Routes } from '@angular/router';

import { DeviceComponent } from './device/device.component';
import { ScreenComponent } from './screen/screen.component';
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./pageNotFound/pageNotFound.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'screen', component: ScreenComponent },
  { path: 'device', component: DeviceComponent },
  { path: '**', component: PageNotFoundComponent }

];