import { Component, Input } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Weather } from '../../interfaces/weather.interface';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'weather-page',
  templateUrl: './weather-page.component.html',
  styleUrl: './weather-page.component.css'
})
export class WeatherPageComponent {




  @Input()
  weather: Weather | undefined

  constructor(private weatherService:WeatherService){}


  get weater():Weather | undefined{

    console.log(this.weatherService.weater);
    return this.weatherService.weater


  }

}
