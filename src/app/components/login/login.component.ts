import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService], 
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private messageService: MessageService, private router: Router) {}
  login() {
    if (this.username === 'admin' && this.password === 'admin') {
      this.messageService.add({
        severity: 'success',
        summary: 'Login bem-sucedido',
        detail: 'Você foi autenticado com sucesso!'
      });
  
      setTimeout(() => {
        this.router.navigate(['/dashboard']); 
      }, 1000);
  
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro de autenticação',
        detail: 'Usuário ou senha inválidos. Por favor, tente novamente.',
      });
    }
  }
}  
