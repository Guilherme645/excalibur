import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  private apiUrl = 'http://localhost:3000/arquivos';

  constructor(private http: HttpClient) {}

  getArquivos(
    page: number = 0,
    limit: number = 7,
    termo: string = '',
    categoria: string | null = null
  ): Observable<Arquivo[]> {
    let url = `${this.apiUrl}?_page=${page + 1}&_limit=${limit}`;
    
    if (termo) {
      url += `&q=${termo}`;
    }

    if (categoria) {
      url += `&tipoColecao=${categoria}`;
    }

    return this.http.get<Arquivo[]>(url);
  }

  getTotalItems(termo: string = '', categoria: string | null = null): Observable<number> {
    let url = `${this.apiUrl}`;
    
    if (termo) {
      url += `?q=${termo}`;
    }

    if (categoria) {
      url += `${termo ? '&' : '?'}tipoColecao=${categoria}`;
    }

    return this.http.get<Arquivo[]>(url, { observe: 'response' }).pipe(
      map(response => {
        const total = response.headers.get('X-Total-Count');
        return total ? parseInt(total, 10) : 0;
      })
    );
  }

  getArquivoById(id: string): Observable<Arquivo> { // Alterado de number para string
    return this.http.get<Arquivo>(`${this.apiUrl}/${id}`);
  }

  createArquivo(arquivo: Omit<Arquivo, 'id'>): Observable<Arquivo> {
    const payload = {
      ...arquivo,
      dataCriacao: new Date().toISOString()
    };
    return this.http.post<Arquivo>(this.apiUrl, payload);
  }

  updateArquivo(arquivo: Arquivo): Observable<Arquivo> {
    return this.http.put<Arquivo>(`${this.apiUrl}/${arquivo.id}`, arquivo);
  }

  deleteArquivo(id: string): Observable<void> { // Alterado de number para string
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}