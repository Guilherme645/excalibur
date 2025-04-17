import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-colecoes',
  templateUrl: './page-colecoes.component.html',
  styleUrls: ['./page-colecoes.component.css'],
  
})
export class PageColecoesComponent  {
  isSidebarCollapsed = false; 

  constructor() { }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }


}
