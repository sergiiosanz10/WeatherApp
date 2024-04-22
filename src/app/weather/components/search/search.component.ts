import { Component, OnInit } from '@angular/core';
import { Weather } from '../../interfaces/weather.interface';
import { WeatherService } from '../../services/weather.service';
import { FormControl } from '@angular/forms';
import { ForeCast } from '../../interfaces/forecast.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'search-page',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  // Variables privadas
  weather: Weather | undefined;
  forecast: ForeCast | undefined;
  history: string[] | undefined = [];



  // Variables publicas
  public value: string = '';
  public search: FormControl<string | null> = new FormControl('')

  constructor(private weatherService: WeatherService, private _snackBar: MatSnackBar) { }


  // Lifecylce


  ngOnInit() {
    this.history = this.weatherService.tagsHistory;
  }

  openSnackBar() {
    this._snackBar.open("Introduce una cidudad");
  }


  searchCity() {

    if (this.search.value === "") {

      this.openSnackBar();

      return;
    } else {


      let searchValue = this.search.value?.replace(/ /g, ",");

      this.weatherService.organizeHistory(searchValue!);

      this.weatherService.getweather(searchValue!)
        .subscribe(data => {
          this.weather = data;
          this.weatherService.conseguirDatos(data);

        });

      //CONSEGUIR DATOS DE LOS 7 DIAS
      this.weatherService.getForecast(searchValue!)
        .subscribe(data => {
          this.forecast = data;
          this.weatherService.conseguirDatoForecast(data);
        });

      this.search.setValue('');
    }
  }

  searchTagCity(tag: string) {

    if (this.search.value === "") return this.openSnackBar();

    this.weatherService.getweather(tag)
      .subscribe(data => {
        this.weather = data;
        this.weatherService.conseguirDatos(data);
      });

    //CONSEGUIR DATOS DE LOS 7 DIAS
    this.weatherService.getForecast(tag)
      .subscribe(data => {
        this.forecast = data;
        this.weatherService.conseguirDatoForecast(data);
      });

  }

  deleteTagCity(tag: string) {
    this.weatherService.deleteTag(tag);
  }



  get getHistory() {
    return this.weatherService.tagsHistory;
  }
}
