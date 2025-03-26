import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  visible: boolean = true; // Controla a visibilidade do sidebar

  // Lista de módulos (itens do menu)
  modules = [
    { label: 'Documentos', icon: 'pi pi-folder', route: '/adicionar' },
    { label: 'Categorias', icon: 'pi pi-tags', route: '/table' },
    { label: 'Relatórios', icon: 'pi pi-chart-bar', route: '/reports' },
    { label: 'Configurações', icon: 'pi pi-cog', route: '/settings' }
  ];

  // Função para lidar com cliques nos itens (pode ser expandida)
  selectModule(module: any) {
    console.log(`Módulo selecionado: ${module.label}`);
    // Aqui você pode adicionar lógica de navegação ou eventos
  }
}