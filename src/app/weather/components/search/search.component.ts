import { Component } from '@angular/core';
import { Weather } from '../../interfaces/weather.interface';
import { WeatherService } from '../../services/weather.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'search-page',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {


  weather: Weather | undefined

  constructor(private weatherService:WeatherService){}

  value = '';


  search = new FormControl('')

  searchCity(){

    this.weatherService.getweather(this.search.value || "")
    .subscribe(data => {
      this.weather=data;
      this.weatherService.conseguirDatos(data);

    });

  }

}
