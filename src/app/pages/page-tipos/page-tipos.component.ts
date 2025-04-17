import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-tipos',
  templateUrl: './page-tipos.component.html',
  styleUrls: ['./page-tipos.component.css']
})
export class PageTiposComponent {
  isSidebarCollapsed = false; 

  constructor() { }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

}
