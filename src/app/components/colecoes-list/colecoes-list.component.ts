import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CadastroColecoesComponent } from '../cadastro-colecoes/cadastro-colecoes.component';
import { TiposColecoesService } from 'src/app/tipos-colecoes.service';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-colecoes-list',
  templateUrl: './colecoes-list.component.html',
  styleUrls: ['./colecoes-list.component.css'],
  providers: [MessageService]
})
export class ColecoesListComponent implements OnInit {
  @ViewChild('dt') tabela!: Table;

  colecoes: any[] = [];
  colecoesFiltradas: any[] = [];
  sanitizedDescriptions: { [key: string]: SafeHtml } = {};
  termo: string = '';
  pageSize: number = 5;
  page: number = 0;
  totalItems: number = 0;
  displayDialog: boolean = false;
  selectedColecao: any = null;
  selectedDescricao: SafeHtml | null = null;
  ref!: DynamicDialogRef;

  constructor(
    private messageService: MessageService,
    private sanitizer: DomSanitizer,
    private dialogService: DialogService,
    private tiposColecoesService: TiposColecoesService
  ) {}

  ngOnInit(): void {
    this.carregarColecoes();
  }

  carregarColecoes(): void {
    this.tiposColecoesService.getCollectionTypes().subscribe(colecoes => {
      this.colecoes = colecoes;
      this.filtrarEPaginar();
    });
  }

  filtrarEPaginar(): void {
    let resultado = this.colecoes;

    if (this.termo) {
      const termoLower = this.termo.toLowerCase();
      resultado = resultado.filter(c =>
        c.nome.toLowerCase().includes(termoLower) ||
        c.descricao.toLowerCase().includes(termoLower)
      );
    }

    this.colecoesFiltradas = resultado;
    this.totalItems = resultado.length;

    this.colecoesFiltradas.forEach(c => {
      this.sanitizedDescriptions[c.id] = this.sanitizer.bypassSecurityTrustHtml(c.descricao || '');
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

  visualizarColecao(c: any): void {
    this.selectedColecao = c;
    this.selectedDescricao = this.sanitizedDescriptions[c.id];
    this.displayDialog = true;

    this.messageService.add({
      severity: 'info',
      summary: 'Visualizar Coleção',
      detail: `Visualizando "${c.nome}"`
    });
  }

  excluirColecao(c: any): void {
    this.ref = this.dialogService.open(DeleteComponent, {
      header: 'Confirmação de Exclusão',
      width: '30%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: { itemName: c.nome }
    });

    this.ref.onClose.subscribe((confirmado: boolean) => {
      if (confirmado) {
        this.tiposColecoesService.deleteCollectionType(c.id);
        this.messageService.add({
          severity: 'warn',
          summary: 'Coleção Excluída',
          detail: `A coleção "${c.nome}" foi excluída.`
        });
      }
    });
  }

  abrirCadastro(): void {
    this.ref = this.dialogService.open(CadastroColecoesComponent, {
      width: '40%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {}
    });

    this.ref.onClose.subscribe((colecao: any) => {
      if (colecao) {
        if (colecao.id && this.colecoes.some(c => c.id === colecao.id)) {
          this.tiposColecoesService.updateCollectionType(colecao);
        } else {
          this.tiposColecoesService.addCollectionType(colecao);
        }
      }
    });
  }

  editarColecao(c: any): void {
    this.ref = this.dialogService.open(CadastroColecoesComponent, {
      width: '40%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: { colecao: c }
    });

    this.ref.onClose.subscribe((colecao: any) => {
      if (colecao) {
        if (colecao.id && this.colecoes.some(c => c.id === colecao.id)) {
          this.tiposColecoesService.updateCollectionType(colecao);
        } else {
          this.tiposColecoesService.addCollectionType(colecao);
        }
      }
    });
  }
}