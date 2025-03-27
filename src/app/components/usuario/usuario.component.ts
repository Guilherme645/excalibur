import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent  {
  user = {
    nome: 'Antônio Costa',
    usuario: 'acosta',
    email: 'antonio.costa@exemplo.gov.br',
    departamento: 'Arquivo Geral',
    cadastro: new Date(2023, 2, 15), // 15 de março de 2023
    status: 'Ativo',
    grupo: 'arquivista',
    totalArquivos: 1287,
    permissoes: ['Visualizar', 'Cadastrar', 'Editar', 'Excluir']
  };
  
  getAvatarInitials(): string {
    const partes = this.user.nome.trim().split(' ');
    return partes[0][0].toUpperCase() + (partes[1]?.[0].toUpperCase() || '');
  }
  
}
