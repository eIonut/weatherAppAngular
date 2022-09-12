import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather.component';
import {ReactiveFormsModule} from "@angular/forms";
import {convertToCelsiusPipe} from "./convertToCelsius.pipe";


@NgModule({
  declarations: [
    WeatherComponent,
    convertToCelsiusPipe
  ],
    imports: [
        CommonModule,
        WeatherRoutingModule,
        ReactiveFormsModule,
    ]
})
export class WeatherModule { }
