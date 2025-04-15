import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Arquivo, ArquivoService } from 'src/app/arquivos.service';

@Component({
  selector: 'app-arquivos',
  templateUrl: './arquivos.component.html',
  styleUrls: ['./arquivos.component.css']
})
export class ArquivosComponent implements OnInit {
  termo: string = '';
  categoria: string | null = null;
  arquivos: Arquivo[] = [];
  page: number = 0;
  pageSize: number = 7;
  totalItems: number = 0;
  arquivosFiltrados: Arquivo[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private arquivoService: ArquivoService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.termo = params['termo'] || '';
      this.categoria = params['categoria'] || null;
      this.page = params['page'] ? +params['page'] : 0;
      this.pageSize = params['pageSize'] ? +params['pageSize'] : 7;

      this.carregarArquivos();
    });
  }

  carregarArquivos(): void {
    this.arquivoService.getArquivos().subscribe((dados) => {
      this.arquivos = dados;
      this.arquivosFiltrados = this.aplicarFiltros(dados);
      this.totalItems = this.arquivosFiltrados.length;
     
    });
  }
  

  aplicarFiltros(lista: Arquivo[]): Arquivo[] {
    return lista.filter((arquivo) => {
      const matchTermo =
        this.termo === '' ||
        arquivo.tipoDocumento.toLowerCase().includes(this.termo.toLowerCase()) ||
        arquivo.autor.toLowerCase().includes(this.termo.toLowerCase());

      const matchCategoria =
        !this.categoria || arquivo.tipoColecao.toLowerCase() === this.categoria.toLowerCase();

      return matchTermo && matchCategoria;
    });
  }

  pesquisarNovamente(): void {
    if (this.termo) {
      this.router.navigate(['/resultados'], {
        queryParams: { termo: this.termo, page: 0, pageSize: this.pageSize },
      });
    }
  }

  onPageChange(event: any): void {
    this.page = event.page;
    this.pageSize = event.rows;
  }
  
}
