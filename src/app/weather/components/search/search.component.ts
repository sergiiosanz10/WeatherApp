import { Component, OnInit } from '@angular/core';
import { Weather } from '../../interfaces/weather.interface';
import { WeatherService } from '../../services/weather.service';
import { FormControl } from '@angular/forms';
import { ForeCast } from '../../interfaces/forecast.interface';

@Component({
  selector: 'search-page',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{


  weather: Weather | undefined;
  forecast: ForeCast | undefined;
  history: string[] | undefined= [];

  constructor(private weatherService:WeatherService){}

  public value: string = '';


  public search  = new FormControl('')

  searchCity(){

    if(this.search.value === "") return;
    this.weatherService.organizeHistory(this.search.value!);

    this.weatherService.getweather(this.search.value!)
    .subscribe(data => {
      this.weather=data;
      this.weatherService.conseguirDatos(data);

    });

    //CONSEGUIR DATOS DE LOS 7 DIAS
    this.weatherService.getForecast(this.search.value!)
    .subscribe(data => {
      this.forecast=data;
      this.weatherService.conseguirDatoForecast(data);
    });


  }

  searchTagCity(tag: string){
    this.weatherService.getweather(tag)
    .subscribe(data => {
      this.weather=data;
      this.weatherService.conseguirDatos(data);
    });

    //CONSEGUIR DATOS DE LOS 7 DIAS
    this.weatherService.getForecast(tag)
    .subscribe(data => {
      this.forecast=data;
      this.weatherService.conseguirDatoForecast(data);
    });

  }

  deleteTagCity(tag: string){
    this.weatherService.deleteTag(tag);
  }

  ngOnInit(){
    this.history = this.weatherService.tagsHistory;
  }

  get getHistory(){
    return this.weatherService.tagsHistory;
  }
}
