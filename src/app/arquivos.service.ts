import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Arquivo {
  id: string;
  tipoDocumento: string;
  tipoColecao: string;
  autor: string;
  formato: string;
  palavrasChave: string[];
  dataCriacao: string;
  title: string;
  description?: string;
  link?: string;
}

export type ArquivoCreateDTO = Omit<Arquivo, 'id'>;

@Injectable({
  providedIn: 'root'
})
export class ArquivoService {
  private jsonUrl = 'assets/arquivos.json'; // Updated path
  private arquivos: Arquivo[] = [];

  constructor(private http: HttpClient) {
    this.loadArquivos().subscribe({
      next: (data) => {
        const storedArquivos = localStorage.getItem('arquivos');
        this.arquivos = storedArquivos ? JSON.parse(storedArquivos) : data;
      },
      error: (error) => {
        console.error('Error loading arquivos:', error);
        this.arquivos = []; // Fallback to empty array
      }
    });
  }

  private loadArquivos(): Observable<Arquivo[]> {
    return this.http.get<Arquivo[]>(this.jsonUrl).pipe(
      catchError((error) => {
        console.error('Failed to load JSON file:', error);
        return of([]); // Return empty array on error
      })
    );
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('arquivos', JSON.stringify(this.arquivos));
  }

  getArquivos(
    page: number = 0,
    limit: number = 5,
    termo: string = '',
    categoria: string | null = null
  ): Observable<Arquivo[]> {
    return of(this.arquivos).pipe(
      map(arquivos => {
        let filteredArquivos = arquivos;

        if (termo) {
          const termoLower = termo.toLowerCase();
          filteredArquivos = filteredArquivos.filter(a =>
            a.title.toLowerCase().includes(termoLower) ||
            a.tipoDocumento.toLowerCase().includes(termoLower) ||
            a.autor.toLowerCase().includes(termoLower)
          );
        }

        if (categoria) {
          filteredArquivos = filteredArquivos.filter(a => a.tipoColecao.toLowerCase() === categoria.toLowerCase());
        }

        const start = page * limit;
        const end = start + limit;
        return filteredArquivos.slice(start, end);
      })
    );
  }

  getTotalItems(termo: string = '', categoria: string | null = null): Observable<number> {
    return of(this.arquivos).pipe(
      map(arquivos => {
        let filteredArquivos = arquivos;

        if (termo) {
          const termoLower = termo.toLowerCase();
          filteredArquivos = filteredArquivos.filter(a =>
            a.title.toLowerCase().includes(termoLower) ||
            a.tipoDocumento.toLowerCase().includes(termoLower) ||
            a.autor.toLowerCase().includes(termoLower)
          );
        }

        if (categoria) {
          filteredArquivos = filteredArquivos.filter(a => a.tipoColecao.toLowerCase() === categoria.toLowerCase());
        }

        return filteredArquivos.length;
      })
    );
  }

  getArquivoById(id: string): Observable<Arquivo> {
    const arquivo = this.arquivos.find(a => a.id === id);
    if (arquivo) {
      return of(arquivo);
    } else {
      return of(null).pipe(
        map(() => { throw new Error('Arquivo não encontrado'); })
      );
    }
  }

  createArquivo(arquivo: ArquivoCreateDTO): Observable<Arquivo> {
    const newArquivo: Arquivo = {
      id: String(this.arquivos.length + 1),
      ...arquivo,
      dataCriacao: new Date().toISOString()
    };
    this.arquivos.push(newArquivo);
    this.saveToLocalStorage();
    return of(newArquivo);
  }

  updateArquivo(arquivo: Arquivo): Observable<Arquivo> {
    const index = this.arquivos.findIndex(a => a.id === arquivo.id);
    if (index !== -1) {
      this.arquivos[index] = arquivo;
      this.saveToLocalStorage();
      return of(arquivo);
    } else {
      return of(null).pipe(
        map(() => { throw new Error('Arquivo não encontrado'); })
      );
    }
  }

  deleteArquivo(id: string): Observable<void> {
    const index = this.arquivos.findIndex(a => a.id === id);
    if (index !== -1) {
      this.arquivos.splice(index, 1);
      this.saveToLocalStorage();
      return of(undefined);
    } else {
      return of(null).pipe(
        map(() => { throw new Error('Arquivo não encontrado'); })
      );
    }
  }
}