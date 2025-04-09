import { Component } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  user = {
    nome: 'Antônio Costa',
    endereco: 'Rua das Flores, 123',
    cep: '12345-678',
    bairro: 'Centro',
    estado: 'São Paulo',
    telefone: '(11) 98765-4321',
    email: 'antonio.costa@exemplo.gov.br',
    grupoAcesso: 'Arquivistas',
    grupoAcessoDetalhes: {
      nomeGrupo: 'Arquivistas',
      permissoes: ['Visualizar', 'Cadastrar', 'Editar', 'Excluir']
    }
  };

  getAvatarInitials(): string {
    const partes = this.user.nome.trim().split(' ');
    return partes[0][0].toUpperCase() + (partes[1]?.[0].toUpperCase() || '');
  }
}