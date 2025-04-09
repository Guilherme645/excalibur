import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [MessageService]
})
export class TableComponent {
  @ViewChild('dt') tabela!: Table;

  arquivos = [
    { 
      id: 1, 
      tipoDocumento: 'Relatório', 
      tipoColecao: 'Administrativa', 
      autor: 'João Silva', 
      formato: 'PDF', 
      palavrasChave: ['Final', 'Relatório'],
      dataCriacao: new Date(2023, 10, 1) 
    },
    { 
      id: 2, 
      tipoDocumento: 'Imagem', 
      tipoColecao: 'Visual', 
      autor: 'Maria Oliveira', 
      formato: 'PNG', 
      palavrasChave: ['Foto', 'Projeto'],
      dataCriacao: new Date(2023, 11, 15) 
    },
    { 
      id: 3, 
      tipoDocumento: 'Planilha', 
      tipoColecao: 'Financeira', 
      autor: 'Pedro Santos', 
      formato: 'XLSX', 
      palavrasChave: ['Dados', '2024'],
      dataCriacao: new Date(2024, 1, 5) 
    },
    { 
      id: 4, 
      tipoDocumento: 'Contrato', 
      tipoColecao: 'Jurídica', 
      autor: 'Ana Costa', 
      formato: 'DOCX', 
      palavrasChave: ['Contrato', 'Assinatura'],
      dataCriacao: new Date(2023, 6, 20) 
    },
    { 
      id: 5, 
      tipoDocumento: 'Backup', 
      tipoColecao: 'Técnica', 
      autor: 'Carlos Lima', 
      formato: 'ZIP', 
      palavrasChave: ['Backup', 'Sistema'],
      dataCriacao: new Date(2022, 3, 10) 
    }
  ];

  constructor(private messageService: MessageService) {}

  applyFilterGlobal(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tabela.filterGlobal(filterValue, 'contains');
  }

  visualizarArquivo(arquivo: any) {
    this.messageService.add({
      severity: 'info',
      summary: 'Visualizar Arquivo',
      detail: `Visualizando "${arquivo.tipoDocumento} - ${arquivo.autor}"`
    });
  }

  excluirArquivo(arquivo: any) {
    this.arquivos = this.arquivos.filter(a => a.id !== arquivo.id);
    this.messageService.add({
      severity: 'warn',
      summary: 'Arquivo Excluído',
      detail: `O arquivo "${arquivo.tipoDocumento} - ${arquivo.autor}" foi excluído.`
    });
  }
}