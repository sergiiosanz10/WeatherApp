import { Component } from '@angular/core';

@Component({
  selector: 'layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {
  public sidebarItems = [
    {label: 'Listado', icon: 'label', url: './list'},
  ]
  
}
