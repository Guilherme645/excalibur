import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-cadastro-colecao',
  templateUrl: './page-cadastro-colecao.component.html',
  styleUrls: ['./page-cadastro-colecao.component.css'],
  standalone: false,
})
export class PageCadastroColecaoComponent {
  isSidebarCollapsed = false; 

  constructor() { }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

}
