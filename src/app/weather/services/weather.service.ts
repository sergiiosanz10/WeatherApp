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

  private _tagsHistory: string[] = [];

  private apiKey: string =          '&appid=1f9ccab4cdafe0e22916708e85513df9&cnt=7&units=metric';
  private serviceUrl: string =      'https://api.openweathermap.org/data/2.5/weather?';
  private serviceForecast: string = 'https://api.openweathermap.org/data/2.5/forecast/daily?';



  constructor(private http: HttpClient) {
    this.loadLocalStorage()
  }


  //Historial de busqueda
  get tagsHistory() {
    return [...this._tagsHistory];
  }

   organizeHistory(tag: string) {

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);

    this._tagsHistory = this.tagsHistory.splice(0, 10);

    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagsHistory.length === 0) return;

  }

  //#####################


  get weater(): Weather | undefined {
    return this.weatherList
  }

  getweather(city: string | undefined): Observable<Weather> {
    return this.http.get<Weather>(`${this.serviceUrl}q=${city}${this.apiKey}`);
  }

  //Geolocation
  getweatherGeo(lat: number, lon: number): Observable<Weather> {
    return this.http.get<Weather>(`${this.serviceUrl}lat=${lat}&lon=${lon}${this.apiKey}`);
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
    return this.http.get<ForeCast>(`${this.serviceForecast}q=${city}${this.apiKey}`);
  }

  getForecastGeo(lat: number, lon: number): Observable<ForeCast> {
    return this.http.get<ForeCast>(`${this.serviceForecast}lat=${lat}&lon=${lon}${this.apiKey}`);
  }

  conseguirDatoForecast(datoForecast: ForeCast) {
    this.foreCastList = datoForecast;

    this.dateList = datoForecast.list

  }


  enviardatoForecast(datoForeCast: ForeCast) {
    return datoForeCast;

  }

}
