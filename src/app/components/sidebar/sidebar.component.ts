import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() isCollapsed = false; 
  @Output() sidebarToggle = new EventEmitter<boolean>(); 
  ngOnInit(): void {
    const savedState = localStorage.getItem('sidebarCollapsed');
    this.isCollapsed = savedState === 'true'; 
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem('sidebarCollapsed', String(this.isCollapsed));
  }
  menuItems = [
    { label: 'Arquivos', icon: 'pi pi-home', route: '/arquivos' },

    { label: 'Tabela', icon: 'pi pi-book', route: '/dashboard' },
      
    //  { label: 'Serviços', icon: 'pi pi-cog', route: '/adicionar' },

     { label: 'Conta', icon: 'pi pi-user', route: '/perfil' },

    
  

    { label: 'Sair', icon: 'pi pi-sign-out', route: '/login' }

  ];

  
}
