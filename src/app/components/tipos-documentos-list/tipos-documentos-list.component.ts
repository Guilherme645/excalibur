import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

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

  constructor(
    private sanitizer: DomSanitizer,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.carregarTipos();
  }

  carregarTipos(): void {
    this.tipos = [
      {
        id: 1,
        nome: 'Relatório',
        descricao: 'Documento técnico que apresenta <strong>dados e análises</strong> sobre determinada atividade.',
        palavrasChave: ['análise', 'técnico'],
        dataCriacao: new Date('2024-04-01')
      },
      {
        id: 2,
        nome: 'Ata',
        descricao: 'Registro <em>fiel</em> de uma reunião, assembleia ou sessão.',
        palavrasChave: ['reunião', 'registro'],
        dataCriacao: new Date('2024-03-01')
      },
      {
        id: 3,
        nome: 'Ofício',
        descricao: 'Documento de comunicação <strong>oficial</strong> entre setores ou instituições.',
        palavrasChave: ['comunicação', 'oficial'],
        dataCriacao: new Date('2024-02-15')
      },
      {
        id: 4,
        nome: 'Memorando',
        descricao: 'Instrumento para comunicação interna com <u>linguagem objetiva</u>.',
        palavrasChave: ['interno', 'rápido'],
        dataCriacao: new Date('2024-02-01')
      },
      {
        id: 5,
        nome: 'Contrato',
        descricao: 'Acordo formal com cláusulas entre partes interessadas.',
        palavrasChave: ['jurídico', 'acordo'],
        dataCriacao: new Date('2024-01-25')
      },
      {
        id: 6,
        nome: 'Requerimento',
        descricao: 'Solicitação <strong>formal</strong> a uma autoridade competente.',
        palavrasChave: ['solicitação', 'formal'],
        dataCriacao: new Date('2024-01-10')
      }
    ];

    this.filtrarTipos();
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
    if (confirm('Tem certeza que deseja excluir este tipo de documento?')) {
      this.tipos = this.tipos.filter(tipo => tipo.id !== t.id);
      this.filtrarTipos();

      this.messageService.add({
        severity: 'warn',
        summary: 'Excluído',
        detail: `Tipo "${t.nome}" removido com sucesso.`
      });
    }
  }
}
