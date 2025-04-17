import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CadastroTiposDocumentosComponent } from '../cadastro-tipos-documentos/cadastro-tipos-documentos.component';
import { TiposColecoesService } from 'src/app/tipos-colecoes.service';
import { DeleteComponent } from '../delete/delete.component';


@Component({
  selector: 'app-tipos-documentos-list',
  templateUrl: './tipos-documentos-list.component.html',
  styleUrls: ['./tipos-documentos-list.component.css'],
  providers: [MessageService]
})
export class TiposDocumentosListComponent implements OnInit {
  @ViewChild('dt') tabela!: Table;

  tipos: any[] = [];
  tiposFiltrados: any[] = [];
  termo: string = '';
  pageSize = 5;
  page = 0;
  totalItems = 0;

  displayDialog = false;
  selectedTipo: any = null;
  selectedDescricao: SafeHtml | null = null;
  sanitizedDescriptions: { [key: string]: SafeHtml } = {};
  ref!: DynamicDialogRef;

  constructor(
    private messageService: MessageService,
    private sanitizer: DomSanitizer,
    private dialogService: DialogService,
    private tiposColecoesService: TiposColecoesService
  ) {}

  ngOnInit(): void {
    this.carregarTipos();
  }

  carregarTipos(): void {
    this.tiposColecoesService.getDocumentTypes().subscribe(tipos => {
      this.tipos = tipos;
      this.filtrarTipos();
    });
  }

  filtrarTipos(): void {
    let resultado = this.tipos;

    if (this.termo) {
      const termoLower = this.termo.toLowerCase();
      resultado = resultado.filter(t =>
        t.nome.toLowerCase().includes(termoLower) ||
        t.descricao.toLowerCase().includes(termoLower)
      );
    }

    this.tiposFiltrados = resultado;
    this.totalItems = resultado.length;

    this.tiposFiltrados.forEach(t => {
      this.sanitizedDescriptions[t.id] = this.sanitizer.bypassSecurityTrustHtml(t.descricao || '');
    });
  }

  applyFilterGlobal(event: Event): void {
    this.termo = (event.target as HTMLInputElement).value;
    this.page = 0;
    this.filtrarTipos();
  }

  onPageChange(event: any): void {
    this.page = event.first / event.rows;
    this.pageSize = event.rows;
    this.filtrarTipos();
  }

  visualizarTipo(t: any): void {
    this.selectedTipo = t;
    this.selectedDescricao = this.sanitizedDescriptions[t.id];
    this.displayDialog = true;

    this.messageService.add({
      severity: 'info',
      summary: 'Visualização',
      detail: `Visualizando tipo: "${t.nome}"`
    });
  }

  excluirTipo(t: any): void {
    this.ref = this.dialogService.open(DeleteComponent, {
      header: 'Confirmação de Exclusão',
      width: '30%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: { itemName: t.nome }
    });

    this.ref.onClose.subscribe((confirmado: boolean) => {
      if (confirmado) {
        this.tiposColecoesService.deleteDocumentType(t.id);
        this.messageService.add({
          severity: 'warn',
          summary: 'Excluído',
          detail: `Tipo "${t.nome}" removido com sucesso.`
        });
      }
    });
  }

  abrirCadastro(): void {
    this.ref = this.dialogService.open(CadastroTiposDocumentosComponent, {
      width: '40%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {}
    });

    this.ref.onClose.subscribe((tipo: any) => {
      if (tipo) {
        if (tipo.id && this.tipos.some(t => t.id === tipo.id)) {
          this.tiposColecoesService.updateDocumentType(tipo);
        } else {
          this.tiposColecoesService.addDocumentType(tipo);
        }
      }
    });
  }

  editarTipo(t: any): void {
    this.ref = this.dialogService.open(CadastroTiposDocumentosComponent, {
      width: '40%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: { tipo: t }
    });

    this.ref.onClose.subscribe((tipo: any) => {
      if (tipo) {
        if (tipo.id && this.tipos.some(t => t.id === tipo.id)) {
          this.tiposColecoesService.updateDocumentType(tipo);
        } else {
          this.tiposColecoesService.addDocumentType(tipo);
        }
      }
    });
  }
}