import { Component, Input } from '@angular/core';
import { Weather } from '../../interfaces/weather.interface';

@Component({
  selector: 'temperature-page',
  templateUrl: './temperature-page.component.html',
  styleUrl: './temperature-page.component.css'
})
export class TemperaturePageComponent {



  @Input({required:true})  weather?: Weather;





}
