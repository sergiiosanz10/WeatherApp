import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Weather } from '../interfaces/weather.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  public weatherList: Weather | undefined;


  private apiKey: string = '&appid=1f9ccab4cdafe0e22916708e85513df9&units=metric';
  private serviceUrl: string = 'https://api.openweathermap.org/data/2.5/weather?q='

  constructor(private http: HttpClient) { }


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

}
