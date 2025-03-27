import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


export interface Noticia {
  id: string;
  title: string; // Nome do arquivo
  description: string; // Descrição ou tipo
  link: string; // Link para visualizar ou baixar
  pubDate: string; // Data de criação ou modificação
  faviconUrl?: string; // Ícone do tipo de arquivo (opcional)
  sourceUrl?: string; // Caminho ou origem
  categoria: string;
}


@Component({
  selector: 'app-arquivos',
  templateUrl: './arquivos.component.html',
  styleUrls: ['./arquivos.component.css']
})
export class ArquivosComponent implements OnInit {

  termo: string = '';
  categoria: string | null = null;
  noticias: Noticia[] = [];
  page: number = 0;
  pageSize: number = 7;
  totalItems: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.termo = params['termo'] || '';
      this.categoria = params['categoria'] || null;
      this.page = params['page'] ? +params['page'] : 0;
      this.pageSize = params['pageSize'] ? +params['pageSize'] : 7;
  
      this.carregarNoticiasMock();
    });
  }
  carregarNoticiasMock(): void {
    const tipos = ['PDF', 'DOCX', 'XLSX', 'Imagem', 'ZIP'];
    const categorias = ['Relatório', 'Ofício', 'Memorando', 'Contrato', 'Formulário'];
    const setores = ['Financeiro', 'RH', 'Jurídico', 'Compras', 'TI'];
  
    const todasNoticias: Noticia[] = Array.from({ length: 40 }, (_, i) => {
      const tipo = tipos[i % tipos.length];
      const categoria = categorias[i % categorias.length];
      const setor = setores[i % setores.length];
      const id = `${i + 1}`;
      const extensao = tipo.toLowerCase();
      const nomeArquivo = `DOC_${categoria}_${i + 1}.${extensao}`;
  
      return {
        id,
        title: nomeArquivo,
        description: `Documento do setor de ${setor}, referente à atividade de ${categoria.toLowerCase()}. Arquivo no formato ${tipo}.`,
        link: `https://exemplo.com/arquivos/${nomeArquivo}`,
        pubDate: new Date(2024, i % 12, (i % 28) + 1).toISOString(),
        faviconUrl: `assets/icons/${extensao}.png`,
        sourceUrl: `/arquivos/${setor.toLowerCase()}/${categoria.toLowerCase()}/${nomeArquivo}`,
        categoria
      };
    });
  
    const start = this.page * this.pageSize;
    const end = start + this.pageSize;
  
    this.totalItems = todasNoticias.length;
    this.noticias = todasNoticias.slice(start, end);
  }
  
  pesquisarNovamente(): void {
    if (this.termo) {
      this.router.navigate(['/resultados'], {
        queryParams: { termo: this.termo, page: 0, pageSize: this.pageSize },
      });
    }
  }

  // buscarNoticias(): void {
  //   this.pesquisaService
  //     .buscarNoticias(this.termo, this.categoria, this.page, this.pageSize)
  //     .subscribe((response) => {
  //       this.noticias = response.content;
  //       this.totalItems = response.totalElements;
  //     });
  // }

  /**
   * Atualiza os parâmetros de busca ao trocar de página.
   * @param event Evento disparado pelo <p-paginator>.
   */
  onPageChange(event: any): void {
    this.page = event.page;
    this.pageSize = event.rows;
    this.router.navigate(['/resultados'], {
      queryParams: {
        termo: this.termo,
        categoria: this.categoria,
        page: this.page,
        pageSize: this.pageSize,
      },
    });
  }
}

