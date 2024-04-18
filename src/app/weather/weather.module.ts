import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './pages/main-page.component';
import { WeatherPageComponent } from './components/weather-page/weather-page.component';
import { MaterialModule } from '../material/material.module';
import { LayoutPageComponent } from './components/layout-page/layout-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WindPageComponent } from './components/wind-cloud-page/wind-page.component';
import { TemperaturePageComponent } from './components/temperature-page/temperature-page.component';
import { SearchComponent } from './components/search/search.component';


@NgModule({
  declarations: [
    MainPageComponent,
    LayoutPageComponent,
    WeatherPageComponent,
    WindPageComponent,
    TemperaturePageComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,

  ],
  exports: [
    MainPageComponent
  ]
})
export class WeatherModule { }
