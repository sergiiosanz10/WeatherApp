import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './pages/main-page.component';
import { WeatherPageComponent } from './components/weather-page/weather-page.component';
import { MaterialModule } from '../material/material.module';
import { LayoutPageComponent } from './components/layout-page/layout-page.component';



@NgModule({
  declarations: [
    MainPageComponent,
    LayoutPageComponent,
    WeatherPageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MainPageComponent
  ]
})
export class WeatherModule { }
