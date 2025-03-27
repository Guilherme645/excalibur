import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-arquivos',
  templateUrl: './page-arquivos.component.html',
  styleUrls: ['./page-arquivos.component.css']
})
export class PageArquivosComponent {
  isSidebarCollapsed = false; 

  constructor() { }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

}
