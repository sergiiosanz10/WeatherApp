import { Component, Input } from '@angular/core';
import { ForeCast, List } from '../../interfaces/forecast.interface';

@Component({
  selector: 'weather-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent  {

  @Input({required:true})  forecast?: ForeCast;

  @Input({required:true})  datelist?: List[];

}
