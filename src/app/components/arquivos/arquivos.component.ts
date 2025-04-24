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
    this.arquivoService
      .getArquivos(this.page, this.pageSize, this.termo, this.categoria)
      .subscribe({
        next: (dados) => {
          this.arquivos = dados;
          this.arquivoService.getTotalItems(this.termo, this.categoria).subscribe({
            next: (total) => {
              this.totalItems = total;
            },
            error: (error) => {
              console.error('Error fetching total items:', error);
              this.totalItems = 0;
            }
          });
        },
        error: (error) => {
          console.error('Error fetching arquivos:', error);
          this.arquivos = [];
        }
      });
  }

  pesquisarNovamente(): void {
    this.router.navigate(['/resultados'], {
      queryParams: {
        termo: this.termo || null,
        categoria: this.categoria || null,
        page: 0,
        pageSize: this.pageSize
      },
      queryParamsHandling: 'merge'
    });
  }

  onPageChange(event: any): void {
    this.page = event.page;
    this.pageSize = event.rows;
    this.router.navigate(['/resultados'], {
      queryParams: {
        termo: this.termo || null,
        categoria: this.categoria || null,
        page: this.page,
        pageSize: this.pageSize
      },
      queryParamsHandling: 'merge'
    });
  }
}