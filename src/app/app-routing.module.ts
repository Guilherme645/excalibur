import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageTableComponent } from './pages/page-table/page-table.component';
import { PageCreateFormComponent } from './pages/page-create-form/page-create-form.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageArquivosComponent } from './pages/page-arquivos/page-arquivos.component';
import { PageUserComponent } from './pages/page-user/page-user.component';
import { CadastroColecoesComponent } from './components/cadastro-colecoes/cadastro-colecoes.component';
import { CadastroTiposDocumentosComponent } from './components/cadastro-tipos-documentos/cadastro-tipos-documentos.component';
import { PageCadastroTipoComponent } from './pages/page-cadastro-tipo/page-cadastro-tipo.component';
import { PageCadastroColecaoComponent } from './pages/page-cadastro-colecao/page-cadastro-colecao.component';
import { PageColecoesComponent } from './pages/page-colecoes/page-colecoes.component';
import { PageTiposComponent } from './pages/page-tipos/page-tipos.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'dashboard', component: PageTableComponent  },
  { path: 'login', component: PageLoginComponent },
  { path: 'adicionar', component: PageCreateFormComponent }, // Rota para criar
  { path: 'editar/:id', component: PageCreateFormComponent }, // Rota para editar
  { path: 'arquivos', component: PageArquivosComponent  },
  { path: 'perfil', component: PageUserComponent  },
  { path: 'cadastroColecoes', component: PageCadastroColecaoComponent  },
  { path: 'cadastrotipos', component: PageCadastroTipoComponent  },
  { path: 'listColecoes', component: PageColecoesComponent  },
  { path: 'listtipos', component: PageTiposComponent  }




];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
