import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

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

  constructor(
    private messageService: MessageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.carregarColecoes();
  }

  carregarColecoes(): void {
    this.colecoes = [
      {
        id: 1,
        nome: 'Administrativa',
        descricao: 'Conjunto de <strong>documentos administrativos</strong> e operacionais.',
        palavrasChave: ['administração', 'ofícios'],
        dataCriacao: new Date('2024-01-01')
      },
      {
        id: 2,
        nome: 'Histórica',
        descricao: 'Documentos que fazem parte do <em>acervo histórico</em> da instituição.',
        palavrasChave: ['história', 'memória'],
        dataCriacao: new Date('2024-02-01')
      },
      {
        id: 3,
        nome: 'Técnica',
        descricao: 'Manuais, procedimentos e projetos técnicos.',
        palavrasChave: ['técnico', 'manual'],
        dataCriacao: new Date('2024-03-01')
      },
      {
        id: 4,
        nome: 'Financeira',
        descricao: 'Documentos relacionados à movimentação financeira.',
        palavrasChave: ['balanço', 'contabilidade'],
        dataCriacao: new Date('2024-04-01')
      },
      {
        id: 5,
        nome: 'Jurídica',
        descricao: 'Pareceres, contratos e processos legais.',
        palavrasChave: ['contrato', 'legal'],
        dataCriacao: new Date('2024-05-01')
      },
      {
        id: 6,
        nome: 'Comunicação Institucional',
        descricao: 'Materiais de comunicação e campanhas.',
        palavrasChave: ['campanha', 'divulgação'],
        dataCriacao: new Date('2024-06-01')
      }
    ];

    this.filtrarEPaginar();
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
    if (confirm('Tem certeza que deseja excluir esta coleção?')) {
      this.colecoes = this.colecoes.filter(col => col.id !== c.id);
      this.filtrarEPaginar();
      this.messageService.add({
        severity: 'warn',
        summary: 'Coleção Excluída',
        detail: `A coleção "${c.nome}" foi excluída.`
      });
    }
  }
}
