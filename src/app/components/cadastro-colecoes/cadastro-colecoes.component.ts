import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-cadastro-colecoes',
  templateUrl: './cadastro-colecoes.component.html',
  styleUrls: ['./cadastro-colecoes.component.css'],
  providers: [MessageService]
})
export class CadastroColecoesComponent implements OnInit {
  colecaoForm: FormGroup;
  isEditing: boolean = false;
  colecaoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {
    this.colecaoForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['']
    });
  }

  ngOnInit(): void {
    // Verifica se há dados passados (edição)
    if (this.config.data && this.config.data.colecao) {
      this.isEditing = true;
      this.colecaoId = this.config.data.colecao.id;
      this.colecaoForm.patchValue({
        nome: this.config.data.colecao.nome,
        descricao: this.config.data.colecao.descricao
      });
    }
  }

  salvar(): void {
    if (this.colecaoForm.valid) {
      const formValue = this.colecaoForm.value;
      const colecao = {
        id: this.isEditing ? this.colecaoId : Math.floor(Math.random() * 1000000), // Mantém ID existente ou gera novo
        nome: formValue.nome,
        descricao: formValue.descricao || '',
        palavrasChave: this.isEditing ? this.config.data.colecao.palavrasChave : [], // Mantém palavras-chave existentes ou vazio
        dataCriacao: this.isEditing ? this.config.data.colecao.dataCriacao : new Date() // Mantém data ou usa nova
      };

      this.messageService.add({
        severity: 'success',
        summary: this.isEditing ? 'Coleção Atualizada' : 'Coleção Cadastrada',
        detail: `A coleção "${formValue.nome}" foi ${this.isEditing ? 'atualizada' : 'adicionada'} com sucesso!`
      });

      // Fecha o dialog e passa a coleção (nova ou atualizada)
      this.ref.close(colecao);

      this.colecaoForm.reset();
    }
  }
}