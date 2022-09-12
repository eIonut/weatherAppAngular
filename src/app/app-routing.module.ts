import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from "@angular/common/http";

const routes: Routes = [
  {path: '', loadChildren: () => import('./weather/weather.module').then(m => m.WeatherModule)},
  { path: 'weather', loadChildren: () => import('./weather/weather.module').then(m => m.WeatherModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
