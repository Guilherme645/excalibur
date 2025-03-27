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
    { id: 1, nome: 'Relatorio_Final.pdf', tipo: 'PDF', tamanho: 512, dataCriacao: new Date(2023, 10, 1) },
    { id: 2, nome: 'Imagem01.png', tipo: 'Imagem', tamanho: 1240, dataCriacao: new Date(2023, 11, 15) },
    { id: 3, nome: 'Dados.xlsx', tipo: 'Planilha', tamanho: 1024, dataCriacao: new Date(2024, 1, 5) },
    { id: 4, nome: 'Contrato.docx', tipo: 'Documento', tamanho: 890, dataCriacao: new Date(2023, 6, 20) },
    { id: 5, nome: 'Backup.zip', tipo: 'Compactado', tamanho: 20480, dataCriacao: new Date(2022, 3, 10) }
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
      detail: `Visualizando "${arquivo.nome}"`
    });
  }

  excluirArquivo(arquivo: any) {
    this.arquivos = this.arquivos.filter(a => a.id !== arquivo.id);
    this.messageService.add({
      severity: 'warn',
      summary: 'Arquivo Excluído',
      detail: `O arquivo "${arquivo.nome}" foi excluído.`
    });
  }
}
