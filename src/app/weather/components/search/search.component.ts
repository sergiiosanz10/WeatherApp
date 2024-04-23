import { Component, OnInit } from '@angular/core';
import { Weather } from '../../interfaces/weather.interface';
import { WeatherService } from '../../services/weather.service';
import { FormControl } from '@angular/forms';
import { ForeCast } from '../../interfaces/forecast.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CityAutocomplete } from '../../interfaces/city.interface';

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

  city: CityAutocomplete[] = [];
  selectedCity?: CityAutocomplete;



  // Variables publicas
  public value: string = '';
  public search: FormControl<string | null> = new FormControl('');

  constructor(private weatherService: WeatherService, private _snackBar: MatSnackBar) { }


  // Lifecylce



  ngOnInit() {
    this.history = this.weatherService.tagsHistory;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000, // Duración en milisegundos
    });
  }

  changeSpace() {
    this.search.setValue(this.search.value!.replace(' ', ', '));
  }

  //Autocompletado

  onSelectedOption(event: MatAutocompleteSelectedEvent): void {

    if (!event.option.value) {
      this.selectedCity = undefined;
      return;
    }

    const city: CityAutocomplete = event.option.value;
    this.search.setValue(city.name);

    this.selectedCity = city;

  }

  autoComplete() {
    const value: string = this.search.value || '';

    this.weatherService.getSuggestions(value)
      .subscribe(city => this.city = city);
  }
  //##########################


  searchCity() {

    if (this.search.value === "") {

      this.openSnackBar('Introduce una ciudad valida!!', 'Cerrar');


    } else

      this.changeSpace();

    this.weatherService.organizeHistory(this.search.value!);


    this.weatherService.getweather(this.search.value!)
      .subscribe(data => {
        this.weather = data;
        console.log(data);

        this.weatherService.conseguirDatos(data);

      });

    //CONSEGUIR DATOS DE LOS 7 DIAS
    this.weatherService.getForecast(this.search.value!)
      .subscribe(data => {
        this.forecast = data;
        this.weatherService.conseguirDatoForecast(data);
      });

    this.search.setValue('');

  }

  searchTagCity(tag: string) {


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
