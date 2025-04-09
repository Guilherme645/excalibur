import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-page-create-form',
  templateUrl: './page-create-form.component.html',
  styleUrls: ['./page-create-form.component.css'],
  providers: [MessageService]
})
export class PageCreateFormComponent {
  documentForm: FormGroup;
  isSidebarCollapsed = false;
  text: string | undefined;

  documentTypes = [
    { label: 'Ofício', value: 'Ofício' },
    { label: 'Relatório', value: 'Relatório' },
    { label: 'Ata', value: 'Ata' },
    { label: 'Contrato', value: 'Contrato' },
    { label: 'Outros', value: 'Outros' }
  ];

  collectionTypes = [
    { label: 'Administrativa', value: 'Administrativa' },
    { label: 'Histórica', value: 'Histórica' },
    { label: 'Técnica', value: 'Técnica' },
    { label: 'Outros', value: 'Outros' }
  ];

  fileFormats = [
    { label: 'PDF', value: 'PDF' },
    { label: 'DOCX', value: 'DOCX' },
    { label: 'JPG', value: 'JPG' },
    { label: 'PNG', value: 'PNG' },
    { label: 'Outros', value: 'Outros' }
  ];

  availableKeywords = [
    { label: 'Urgente', value: 'Urgente' },
    { label: 'Confidencial', value: 'Confidencial' },
    { label: 'Financeiro', value: 'Financeiro' },
    { label: 'Legal', value: 'Legal' },
    { label: 'Administrativo', value: 'Administrativo' }
  ];

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private messageService: MessageService
  ) {
    this.documentForm = this.fb.group({
      documentType: ['', Validators.required],
      collectionType: ['', Validators.required],
      documentNumber: [''],
      productionDate: [new Date(), Validators.required],
      authorOrigin: ['', Validators.required],
      fileFormat: [''],
      fileSize: [''],
      fileUpload: [null], // Campo para armazenar o arquivo
      keywords: [[]],
      description: ['']
    });
  }

  onFileSelect(event: any) {
    const file = event.files[0];
    if (file) {
      this.documentForm.patchValue({ fileUpload: file });
      this.documentForm.patchValue({ fileSize: (file.size / 1024 / 1024).toFixed(2) + ' MB' });
      this.documentForm.patchValue({ fileFormat: file.name.split('.').pop().toUpperCase() }); // Atualiza o formato com base na extensão do arquivo
      this.messageService.add({
        severity: 'info',
        summary: 'Arquivo Selecionado',
        detail: `Arquivo "${file.name}" selecionado com sucesso.`
      });
    }
  }

  saveDocument() {
    if (this.documentForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Por favor, preencha todos os campos obrigatórios!'
      });
      return;
    }
    console.log('Documento salvo:', this.documentForm.value);
    this.router.navigate(['/documents']);
  }

  cancel() {
    this.router.navigate(['/documents']);
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}