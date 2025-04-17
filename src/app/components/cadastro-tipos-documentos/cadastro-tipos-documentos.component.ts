import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-tipos-documentos',
  templateUrl: './cadastro-tipos-documentos.component.html',
  styleUrls: ['./cadastro-tipos-documentos.component.css'],
  providers: [MessageService]
})
export class CadastroTiposDocumentosComponent implements OnInit {

  tipoDocForm: FormGroup;
  tipos: { nome: string; descricao: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {
    this.tipoDocForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['']
    });
  }

  ngOnInit(): void {}

  salvar(): void {
    if (this.tipoDocForm.valid) {
      this.tipos.push(this.tipoDocForm.value);

      this.messageService.add({
        severity: 'success',
        summary: 'Tipo Cadastrado',
        detail: `O tipo "${this.tipoDocForm.value.nome}" foi adicionado com sucesso!`
      });

      this.tipoDocForm.reset();

      // Redireciona após pequeno intervalo
      setTimeout(() => {
        this.router.navigate(['/listtipos']);
      }, 1000);
    }
  }

  remover(index: number): void {
    const removido = this.tipos[index].nome;
    this.tipos.splice(index, 1);

    this.messageService.add({
      severity: 'warn',
      summary: 'Tipo Removido',
      detail: `O tipo "${removido}" foi removido.`
    });
  }
}
