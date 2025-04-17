import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-cadastro-tipos-documentos',
  templateUrl: './cadastro-tipos-documentos.component.html',
  styleUrls: ['./cadastro-tipos-documentos.component.css'],
  providers: [MessageService]
})
export class CadastroTiposDocumentosComponent implements OnInit {
  tipoDocForm: FormGroup;
  isEditing: boolean = false;
  tipoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {
    this.tipoDocForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['']
    });
  }

  ngOnInit(): void {
    // Verifica se há dados passados (edição)
    if (this.config.data && this.config.data.tipo) {
      this.isEditing = true;
      this.tipoId = this.config.data.tipo.id;
      this.tipoDocForm.patchValue({
        nome: this.config.data.tipo.nome,
        descricao: this.config.data.tipo.descricao
      });
    }
  }

  salvar(): void {
    if (this.tipoDocForm.valid) {
      const formValue = this.tipoDocForm.value;
      const tipo = {
        id: this.isEditing ? this.tipoId : Math.floor(Math.random() * 1000000), // Mantém ID existente ou gera novo
        nome: formValue.nome,
        descricao: formValue.descricao || '',
        palavrasChave: this.isEditing ? this.config.data.tipo.palavrasChave : [], // Mantém palavras-chave existentes ou vazio
        dataCriacao: this.isEditing ? this.config.data.tipo.dataCriacao : new Date() // Mantém data ou usa nova
      };

      this.messageService.add({
        severity: 'success',
        summary: this.isEditing ? 'Tipo Atualizado' : 'Tipo Cadastrado',
        detail: `O tipo "${formValue.nome}" foi ${this.isEditing ? 'atualizado' : 'adicionado'} com sucesso!`
      });

      // Fecha o dialog e passa o tipo (novo ou atualizado)
      this.ref.close(tipo);

      this.tipoDocForm.reset();
    }
  }
}