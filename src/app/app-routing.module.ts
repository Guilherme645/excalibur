import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageTableComponent } from './pages/page-table/page-table.component';
import { PageCreateFormComponent } from './pages/page-create-form/page-create-form.component';

const routes: Routes = [
  { path: 'table', component: PageTableComponent },
  { path: 'adicionar', component: PageCreateFormComponent },
  { path: 'table', redirectTo: 'tabela', pathMatch: 'full' } // redireciona rota raiz
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
