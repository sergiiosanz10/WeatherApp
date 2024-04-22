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

// Variables privadas
  weather: Weather | undefined;
  forecast: ForeCast | undefined;
  history: string[] | undefined= [];

  // Variables publicas
  public value: string = '';
  public search: FormControl<string | null>  = new FormControl('')

  constructor(private weatherService:WeatherService){}


  // Lifecylce

  ngOnInit(){
    this.history = this.weatherService.tagsHistory;
  }

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

    this.search.setValue('');

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



  get getHistory(){
    return this.weatherService.tagsHistory;
  }
}
