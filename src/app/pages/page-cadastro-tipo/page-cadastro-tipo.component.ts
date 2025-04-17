import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-cadastro-tipo',
  templateUrl: './page-cadastro-tipo.component.html',
  styleUrls: ['./page-cadastro-tipo.component.css'],
  standalone: false,
})
export class PageCadastroTipoComponent {
  isSidebarCollapsed = false; 

  constructor() { }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

}
