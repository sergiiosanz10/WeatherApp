import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GifsService {



  private _tagsHistory: string[] = [];
  private apiKey: string = 'a9ca5c0fa8eeb2ccc81ca71092859db3';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'

  constructor(private http: HttpClient) {}


}
