import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() isCollapsed = false;
  @Output() sidebarToggle = new EventEmitter<boolean>();

  isArquivosExpanded = false; // estado do submenu

  ngOnInit(): void {
    const savedState = localStorage.getItem('sidebarCollapsed');
    this.isCollapsed = savedState === 'true';
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem('sidebarCollapsed', String(this.isCollapsed));
  }

  toggleArquivos(): void {
    this.isArquivosExpanded = !this.isArquivosExpanded;
  }

  menuItems = [
    { label: 'Busca', icon: 'pi pi-search', route: '/arquivos' },

    { label: 'Arquivos', icon: 'pi pi-book', route: '/dashboard' },
      
    {
      label: 'Identificações',
      icon: 'pi pi-tags',
      route: '/dashboard',
      children: [
        { label: 'Coleções', route: '/listColecoes', icon: 'pi pi-folder-open' },
        { label: 'Modelos', route: '/listtipos', icon: 'pi pi-clone' }
      ]
    }
    ,
    
  
    //  { label: 'Serviços', icon: 'pi pi-cog', route: '/adicionar' },

     { label: 'Conta', icon: 'pi pi-user', route: '/perfil' },

    
  

    { label: 'Sair', icon: 'pi pi-sign-out', route: '/login' }

  ];
}

