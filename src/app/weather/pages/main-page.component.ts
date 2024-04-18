import { Component, Input } from '@angular/core';
import { Weather } from '../interfaces/weather.interface';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  constructor(private weatherService:WeatherService){}

  get weather(): Weather | undefined{
    return this.weatherService.weatherList
  }

}
