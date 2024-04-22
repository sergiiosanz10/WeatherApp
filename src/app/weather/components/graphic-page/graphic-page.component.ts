import { Component, Input, SimpleChanges, OnInit } from '@angular/core';
import {  List } from '../../interfaces/forecast.interface';
import { Graphic, Series } from '../../interfaces/graphic.interface';


@Component({
  selector: 'graphic-page',
  templateUrl: './graphic-page.component.html',
  styleUrl: './graphic-page.component.css'
})
export class GraphicPageComponent {

  ngOnInit(): void {
    this.multi=  this.getGraphics()
  }

  @Input({required: true}) search: List[] | undefined

  multi: Graphic[] = []
  view: [number, number] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dias';
  yAxisLabel: string = 'Grados';
  timeline: boolean = true;


  getGraphics(): Graphic[]{

    let graphicsTemp: Graphic[] = []
    let line: Graphic={
      name: 'Temperatura',
      series:this.getTemp()
    };
    let line2: Graphic={
      name: 'Temperatura Max',
      series:this.getTempMax()
    };
    let line3: Graphic={
      name: 'Temperatura Min',
      series:this.getTempMin()
    };
    graphicsTemp.push(line2, line3, line)
    return graphicsTemp
  }

  getTemp(): Series[]{
    if(this.search==undefined){


      return []
    }else{

  return this.search.map(
        day => {
          return {
            name: new Date(day.dt*1000).toLocaleDateString(),
            value: day.temp.day
            }
        }
      )

    };
  }

  getTempMax(){
    if(this.search==undefined){


      return []
    }else{

  return this.search.map(
        day => {
          return {
            name: new Date(day.dt*1000).toLocaleDateString(),
            value: day.temp.max
            }
        }
      )

    };
  }
  getTempMin(){
    if(this.search==undefined){


      return []
    }else{

  return this.search.map(
        day => {
          return {
            name: new Date(day.dt*1000).toLocaleDateString(),
            value: day.temp.min
            }
        }
      )

    };
  }

}
