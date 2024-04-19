import { Component, Input } from '@angular/core';
import { Weather } from '../../interfaces/weather.interface';
import { ForeCast, List } from '../../interfaces/forecast.interface';

@Component({
  selector: 'weather-page',
  templateUrl: './weather-page.component.html',
  styleUrl: './weather-page.component.css'
})
export class WeatherPageComponent {


  @Input()
  weather: Weather | undefined

  @Input()
  forecast: ForeCast | undefined

  @Input()
  datelist: List[] | undefined



}
