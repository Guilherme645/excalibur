import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  selectedAZ: string = '';
  selectedDate: Date | null = null;
  selectedTypes: string[] = [];
  selectedSize: string = '';
  
  sortAZOptions = [
    { label: 'A → Z', value: 'az' },
    { label: 'Z → A', value: 'za' }
  ];
  
  fileTypes = [
    { label: 'PDF', value: 'pdf' },
    { label: 'Word (DOCX)', value: 'docx' },
    { label: 'Imagem (JPG, PNG)', value: 'img' },
    { label: 'Excel (XLSX)', value: 'xlsx' },
    { label: 'Compactado (ZIP)', value: 'zip' }
  ];
  
  fileSizeOptions = [
    { label: '0–1 MB', value: '0-1' },
    { label: '1–10 MB', value: '1-10' },
    { label: '10–50 MB', value: '10-50' },
    { label: '50+ MB', value: '50+' }
  ];
  
  onAZSortChange(event: any) {
    console.log('Ordenar A-Z:', event.value);
  }
  
  onTypeChange(event: any) {
    console.log('Tipos selecionados:', this.selectedTypes);
  }
  
  onSizeChange(event: any) {
    console.log('Tamanho selecionado:', this.selectedSize);
  }
  
  openAdvancedFilters() {
    console.log('Abrir filtros avançados');
  }
}  