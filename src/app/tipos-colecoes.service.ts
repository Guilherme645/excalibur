import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiposColecoesService {
  private documentTypesSubject = new BehaviorSubject<any[]>([
    { id: 1, nome: 'Relatório', descricao: 'Documento técnico que apresenta dados e análises sobre determinada atividade.', palavrasChave: ['análise', 'técnico'], dataCriacao: new Date('2024-04-01') },
    { id: 2, nome: 'Ata', descricao: 'Registro fiel de uma reunião, assembleia ou sessão.', palavrasChave: ['reunião', 'registro'], dataCriacao: new Date('2024-03-01') },
    { id: 3, nome: 'Ofício', descricao: 'Documento de comunicação oficial entre setores ou instituições.', palavrasChave: ['comunicação', 'oficial'], dataCriacao: new Date('2024-02-15') },
    { id: 4, nome: 'Memorando', descricao: 'Instrumento para comunicação interna com linguagem objetiva.', palavrasChave: ['interno', 'rápido'], dataCriacao: new Date('2024-02-01') },
    { id: 5, nome: 'Contrato', descricao: 'Acordo formal com cláusulas entre partes interessadas.', palavrasChave: ['jurídico', 'acordo'], dataCriacao: new Date('2024-01-25') },
    { id: 6, nome: 'Requerimento', descricao: 'Solicitação formal a uma autoridade competente.', palavrasChave: ['solicitação', 'formal'], dataCriacao: new Date('2024-01-10') }
  ]);

  private collectionTypesSubject = new BehaviorSubject<any[]>([
    { id: 1, nome: 'Administrativa', descricao: 'Conjunto de documentos administrativos e operacionais.', palavrasChave: ['administração', 'ofícios'], dataCriacao: new Date('2024-01-01') },
    { id: 2, nome: 'Histórica', descricao: 'Documentos que fazem parte do acervo histórico da instituição.', palavrasChave: ['história', 'memória'], dataCriacao: new Date('2024-02-01') },
    { id: 3, nome: 'Técnica', descricao: 'Manuais, procedimentos e projetos técnicos.', palavrasChave: ['técnico', 'manual'], dataCriacao: new Date('2024-03-01') },
    { id: 4, nome: 'Financeira', descricao: 'Documentos relacionados à movimentação financeira.', palavrasChave: ['balanço', 'contabilidade'], dataCriacao: new Date('2024-04-01') },
    { id: 5, nome: 'Jurídica', descricao: 'Pareceres, contratos e processos legais.', palavrasChave: ['contrato', 'legal'], dataCriacao: new Date('2024-05-01') },
    { id: 6, nome: 'Comunicação Institucional', descricao: 'Materiais de comunicação e campanhas.', palavrasChave: ['campanha', 'divulgação'], dataCriacao: new Date('2024-06-01') }
  ]);

  documentTypes$ = this.documentTypesSubject.asObservable();
  collectionTypes$ = this.collectionTypesSubject.asObservable();

  constructor() {}

  getDocumentTypes(): Observable<any[]> {
    return this.documentTypes$;
  }

  getCollectionTypes(): Observable<any[]> {
    return this.collectionTypes$;
  }

  addDocumentType(tipo: any): void {
    const currentTypes = this.documentTypesSubject.value;
    this.documentTypesSubject.next([...currentTypes, tipo]);
  }

  updateDocumentType(tipo: any): void {
    const currentTypes = this.documentTypesSubject.value;
    const updatedTypes = currentTypes.map(t => (t.id === tipo.id ? tipo : t));
    this.documentTypesSubject.next(updatedTypes);
  }

  deleteDocumentType(id: number): void {
    const currentTypes = this.documentTypesSubject.value;
    const filteredTypes = currentTypes.filter(t => t.id !== id);
    this.documentTypesSubject.next(filteredTypes);
  }

  addCollectionType(colecao: any): void {
    const currentCollections = this.collectionTypesSubject.value;
    this.collectionTypesSubject.next([...currentCollections, colecao]);
  }

  updateCollectionType(colecao: any): void {
    const currentCollections = this.collectionTypesSubject.value;
    const updatedCollections = currentCollections.map(c => (c.id === colecao.id ? colecao : c));
    this.collectionTypesSubject.next(updatedCollections);
  }

  deleteCollectionType(id: number): void {
    const currentCollections = this.collectionTypesSubject.value;
    const filteredCollections = currentCollections.filter(c => c.id !== id);
    this.collectionTypesSubject.next(filteredCollections);
  }
}