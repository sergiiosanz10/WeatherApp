import { Component, Input } from '@angular/core';
import { Weather } from '../../interfaces/weather.interface';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'wind-page',
  templateUrl: './wind-page.component.html',
  styleUrl: './wind-page.component.css'
})
export class WindPageComponent {

  @Input({required:true})  weather?: Weather;

  constructor(private weatherService:WeatherService){}
}
