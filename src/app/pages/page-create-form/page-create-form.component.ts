import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ArquivoService, Arquivo } from 'src/app/arquivos.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TiposColecoesService } from 'src/app/tipos-colecoes.service';

@Component({
  selector: 'app-page-create-form',
  templateUrl: './page-create-form.component.html',
  styleUrls: ['./page-create-form.component.css'],
  providers: [MessageService]
})
export class PageCreateFormComponent implements OnInit {
  documentForm: FormGroup;
  isSidebarCollapsed = false;
  isEditMode = false;
  arquivoId: string | null = null;

  documentTypes: { label: string, value: string }[] = [];
  collectionTypes: { label: string, value: string }[] = [];

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
    private route: ActivatedRoute,
    private messageService: MessageService,
    private arquivoService: ArquivoService,
    private tiposColecoesService: TiposColecoesService
  ) {
    this.documentForm = this.fb.group({
      documentType: ['', Validators.required],
      collectionType: ['', Validators.required],
      documentNumber: [''],
      productionDate: [new Date(), Validators.required],
      authorOrigin: ['', Validators.required],
      fileFormat: [''],
      fileSize: [''],
      fileUpload: [null],
      keywords: [[]],
      description: ['']
    });
  }

  ngOnInit(): void {
    // Carregar tipos de documentos e coleções do serviço
    this.tiposColecoesService.getDocumentTypes().subscribe(tipos => {
      this.documentTypes = tipos.map(tipo => ({
        label: tipo.nome,
        value: tipo.nome
      }));
    });

    this.tiposColecoesService.getCollectionTypes().subscribe(colecoes => {
      this.collectionTypes = colecoes.map(colecao => ({
        label: colecao.nome,
        value: colecao.nome
      }));
    });

    // Carregar dados para edição, se necessário
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const id = params.get('id');
          if (id) {
            this.isEditMode = true;
            this.arquivoId = id;
            return this.arquivoService.getArquivoById(this.arquivoId);
          }
          return of(null);
        })
      )
      .subscribe({
        next: (arquivo: Arquivo | null) => {
          if (arquivo) {
            this.documentForm.patchValue({
              documentType: arquivo.tipoDocumento,
              collectionType: arquivo.tipoColecao,
              documentNumber: arquivo.title,
              productionDate: new Date(arquivo.dataCriacao),
              authorOrigin: arquivo.autor,
              fileFormat: arquivo.formato,
              keywords: arquivo.palavrasChave,
              description: arquivo.description,
              fileUpload: null
            });
          }
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao carregar os dados do arquivo.'
          });
          this.router.navigate(['/dashboard']);
        }
      });
  }

  stripHtmlTags(html: string): string {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').trim();
  }

  onFileSelect(event: any) {
    const file = event.files[0];
    if (file) {
      this.documentForm.patchValue({ fileUpload: file });
      this.documentForm.patchValue({ fileSize: (file.size / 1024 / 1024).toFixed(2) + ' MB' });
      this.documentForm.patchValue({ fileFormat: file.name.split('.').pop().toUpperCase() });
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

    const formValue = this.documentForm.value;
    const baseArquivo = {
      tipoDocumento: formValue.documentType,
      tipoColecao: formValue.collectionType,
      autor: formValue.authorOrigin,
      formato: formValue.fileFormat,
      palavrasChave: formValue.keywords,
      dataCriacao: new Date(formValue.productionDate).toISOString(),
      title: formValue.documentNumber || 'Sem número',
      description: this.stripHtmlTags(formValue.description || ''),
      link: formValue.fileUpload
        ? `assets/arquivos/${formValue.fileUpload.name}`
        : formValue.link || 'arquivo_desconhecido.pdf'
    };

    if (this.isEditMode) {
      const arquivo: Arquivo = {
        ...baseArquivo,
        id: this.arquivoId!
      };
      this.arquivoService.updateArquivo(arquivo).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Documento atualizado com sucesso!'
          });
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao atualizar o documento.'
          });
        }
      });
    } else {
      const novoArquivo: Omit<Arquivo, 'id'> = baseArquivo;
      this.arquivoService.createArquivo(novoArquivo).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Documento arquivado com sucesso!'
          });
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao salvar o documento.'
          });
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/dashboard']);
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}