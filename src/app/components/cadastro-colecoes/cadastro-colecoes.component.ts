import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-colecoes',
  templateUrl: './cadastro-colecoes.component.html',
  styleUrls: ['./cadastro-colecoes.component.css'],
  providers: [MessageService]
})
export class CadastroColecoesComponent implements OnInit {
  colecaoForm: FormGroup;
  colecoes: { nome: string; descricao: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {
    this.colecaoForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['']
    });
  }

  ngOnInit(): void {}

  salvar(): void {
    if (this.colecaoForm.valid) {
      this.colecoes.push(this.colecaoForm.value);

      this.messageService.add({
        severity: 'success',
        summary: 'Coleção Cadastrada',
        detail: `A coleção "${this.colecaoForm.value.nome}" foi adicionada com sucesso!`
      });

      this.colecaoForm.reset();

      // Aguarda o toast aparecer antes de redirecionar
      setTimeout(() => {
        this.router.navigate(['/listColecoes']);
      }, 1000);
    }
  }

  remover(index: number): void {
    const removida = this.colecoes[index].nome;
    this.colecoes.splice(index, 1);

    this.messageService.add({
      severity: 'warn',
      summary: 'Coleção Removida',
      detail: `A coleção "${removida}" foi excluída.`
    });
  }
}
