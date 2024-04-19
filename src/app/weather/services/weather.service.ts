import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Weather } from '../interfaces/weather.interface';
import { Observable } from 'rxjs';
import { ForeCast, List } from '../interfaces/forecast.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  public weatherList: Weather | undefined;
  public foreCastList: ForeCast | undefined;
  public dateList: List[] | undefined;

  private apiKey: string =          '&appid=1f9ccab4cdafe0e22916708e85513df9&cnt=7&units=metric';
  private serviceUrl: string =      'https://api.openweathermap.org/data/2.5/weather?q=';
  private serviceForecast: string = 'https://api.openweathermap.org/data/2.5/forecast/daily?q=';



  constructor(private http: HttpClient) {}


  get weater(): Weather | undefined {
    return this.weatherList
  }

  getweather(city: string | undefined): Observable<Weather> {
    console.log(city);
    return this.http.get<Weather>(`${this.serviceUrl}${city}${this.apiKey}`);
  }

  conseguirDatos(dato: Weather) {
    this.weatherList = dato;
  }

  enviardatos(dato: Weather) {
    return dato;
  }

  //FORECAST
  // TODO: Pipes :D

  get forecast(): ForeCast | undefined {
    return this.foreCastList
  }

  get date(): List[] | undefined {
    return this.dateList
  }

  getForecast(city: string | undefined): Observable<ForeCast> {
    console.log(city);
    return this.http.get<ForeCast>(`${this.serviceForecast}${city}${this.apiKey}`);
  }

  conseguirDatoForecast(datoForecast: ForeCast) {
    this.foreCastList = datoForecast;

    this.dateList = datoForecast.list

    console.log(this.dateList);


  }


  enviardatoForecast(datoForeCast: ForeCast) {
    return datoForeCast;

  }

}
