import { Component, Input } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

interface Document {
  id: number;
  title: string;
  category: string;
  date: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() documents: Document[] = [];
  
  selectedDocument: Document = { id: 0, title: '', category: '', date: '' };
  displayDialog: boolean = false;
  isEditMode: boolean = false;
  searchQuery: string = '';

  constructor(private confirmationService: ConfirmationService) {}

  // Mostrar diálogo para adicionar ou editar
  showDialog(document?: Document) {
    if (document) {
      this.selectedDocument = { ...document };
      this.isEditMode = true;
    } else {
      this.selectedDocument = { id: 0, title: '', category: '', date: '' };
      this.isEditMode = false;
    }
    this.displayDialog = true;
  }

  // Salvar documento (adicionar ou editar)
  saveDocument() {
    if (this.isEditMode) {
      const index = this.documents.findIndex(doc => doc.id === this.selectedDocument.id);
      this.documents[index] = { ...this.selectedDocument };
    } else {
      this.selectedDocument.id = this.documents.length + 1;
      this.selectedDocument.date = new Date().toLocaleDateString();
      this.documents.push({ ...this.selectedDocument });
    }
    this.displayDialog = false;
    this.selectedDocument = { id: 0, title: '', category: '', date: '' };
  }

  // Deletar documento com confirmação
  deleteDocument(document: Document) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir "${document.title}"?`,
      accept: () => {
        this.documents = this.documents.filter(doc => doc.id !== document.id);
      }
    });
  }

  // Filtrar documentos
  get filteredDocuments() {
    return this.documents.filter(doc =>
      doc.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}