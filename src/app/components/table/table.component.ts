import { Component, ViewChild, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { Arquivo, ArquivoService } from 'src/app/arquivos.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [MessageService]
})
export class TableComponent implements OnInit {
  @ViewChild('dt') tabela!: Table;

  todosArquivos: Arquivo[] = [];
  arquivosFiltrados: Arquivo[] = [];
  page: number = 0;
  pageSize: number = 5;
  totalItems: number = 0;
  termo: string = '';
  sanitizedDescriptions: { [key: string]: SafeHtml } = {}; 
  selectedArquivo: Arquivo | null = null;
  selectedArquivoDescription: SafeHtml | null = null;
  displayDialog: boolean = false;
  ref!: DynamicDialogRef;

  constructor(
    private messageService: MessageService,
    private arquivoService: ArquivoService,
    private sanitizer: DomSanitizer,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.carregarTodosArquivos();
  }

  carregarTodosArquivos(): void {
    this.arquivoService.getArquivos().subscribe({
      next: (dados) => {
        this.todosArquivos = dados;
        this.totalItems = dados.length;
        this.filtrarEPaginar();
      },
      error: () => this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Erro ao carregar arquivos.'
      })
    });
  }

  filtrarEPaginar(): void {
    let filtrados = this.todosArquivos;

    if (this.termo) {
      const termoLower = this.termo.toLowerCase();
      filtrados = filtrados.filter(arq =>
        arq.tipoDocumento.toLowerCase().includes(termoLower) ||
        arq.autor.toLowerCase().includes(termoLower) ||
        arq.title.toLowerCase().includes(termoLower)
      );
    }

    this.totalItems = filtrados.length;
    this.arquivosFiltrados = filtrados;

    // Sanitiza novamente
    this.arquivosFiltrados.forEach(arq => {
      this.sanitizedDescriptions[arq.id] = this.sanitizer.bypassSecurityTrustHtml(arq.description || '');
    });
  }

  applyFilterGlobal(event: Event): void {
    this.termo = (event.target as HTMLInputElement).value;
    this.page = 0;
    this.filtrarEPaginar();
  }

  onPageChange(event: any): void {
    this.page = event.first / event.rows;
    this.pageSize = event.rows;
    this.filtrarEPaginar();
  }

  visualizarArquivo(arquivo: Arquivo): void {
    this.selectedArquivo = arquivo;
    this.selectedArquivoDescription = this.sanitizedDescriptions[arquivo.id];
    this.displayDialog = true;
    this.messageService.add({
      severity: 'info',
      summary: 'Visualizar Arquivo',
      detail: `Visualizando "${arquivo.tipoDocumento} - ${arquivo.autor}"`
    });
  }

  
  excluirArquivo(arquivo: Arquivo): void {
    this.ref = this.dialogService.open(DeleteComponent, {
      header: 'Confirmação de Exclusão',
      width: '30%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: { itemName: `${arquivo.tipoDocumento} - ${arquivo.autor}` }
    });

    this.ref.onClose.subscribe((confirmado: boolean) => {
      if (confirmado) {
        this.arquivoService.deleteArquivo(arquivo.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'warn',
              summary: 'Arquivo Excluído',
              detail: `O arquivo "${arquivo.tipoDocumento} - ${arquivo.autor}" foi excluído.`
            });
            this.carregarTodosArquivos();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao excluir o arquivo.'
            });
          }
        });
      }
    });
  }
}