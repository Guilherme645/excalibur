import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageTableComponent } from './pages/page-table/page-table.component';
import { PageCreateFormComponent } from './pages/page-create-form/page-create-form.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageArquivosComponent } from './pages/page-arquivos/page-arquivos.component';
import { PageUserComponent } from './pages/page-user/page-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'dashboard', component: PageTableComponent  },
  { path: 'login', component: PageLoginComponent },
  { path: 'adicionar', component: PageCreateFormComponent }, // Rota para criar
  { path: 'editar/:id', component: PageCreateFormComponent }, // Rota para editar
  { path: 'arquivos', component: PageArquivosComponent  },
  { path: 'perfil', component: PageUserComponent  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
