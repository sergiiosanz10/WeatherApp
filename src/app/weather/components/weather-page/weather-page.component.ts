import { Component, Input, OnInit } from '@angular/core';
import { Weather } from '../../interfaces/weather.interface';
import { ForeCast, List } from '../../interfaces/forecast.interface';
import { WeatherService } from '../../services/weather.service';


@Component({
  selector: 'weather-page',
  templateUrl: './weather-page.component.html',
  styleUrl: './weather-page.component.css'
})
export class WeatherPageComponent implements OnInit{


  @Input()
  weather: Weather | undefined

  @Input()
  forecast: ForeCast | undefined

  @Input()
  datelist: List[] | undefined

  constructor(private weatherService:WeatherService){}

  ngOnInit(): void {
    
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      this.weatherService.getweatherGeo(latitude, longitude)
      .subscribe(data => {
        this.weather=data;
        this.weatherService.conseguirDatos(data);
      });
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

}
