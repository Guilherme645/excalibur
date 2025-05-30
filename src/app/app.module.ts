import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageCreateFormComponent } from './pages/page-create-form/page-create-form.component';
import { PageEditFormComponent } from './pages/page-edit-form/page-edit-form.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { LoginComponent } from './components/login/login.component';
import { TableComponent } from './components/table/table.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PageTableComponent } from './pages/page-table/page-table.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload'; // Adicionado
import { ConfirmationService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ArquivosComponent } from './components/arquivos/arquivos.component';
import { PaginatorModule } from 'primeng/paginator';
import { PageArquivosComponent } from './pages/page-arquivos/page-arquivos.component';
import { AvatarModule } from 'primeng/avatar';
import { HeaderComponent } from './components/header/header.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { PageUserComponent } from './pages/page-user/page-user.component';
import { BadgeModule } from 'primeng/badge';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { EditorModule } from 'primeng/editor';
import { CadastroColecoesComponent } from './components/cadastro-colecoes/cadastro-colecoes.component';
import { CadastroTiposDocumentosComponent } from './components/cadastro-tipos-documentos/cadastro-tipos-documentos.component';
import { PageCadastroTipoComponent } from './pages/page-cadastro-tipo/page-cadastro-tipo.component';
import { PageCadastroColecaoComponent } from './pages/page-cadastro-colecao/page-cadastro-colecao.component';
import { PageColecoesComponent } from './pages/page-colecoes/page-colecoes.component';
import { PageTiposComponent } from './pages/page-tipos/page-tipos.component';
import { TiposDocumentosListComponent } from './components/tipos-documentos-list/tipos-documentos-list.component';
import { ColecoesListComponent } from './components/colecoes-list/colecoes-list.component';
import { DialogService } from 'primeng/dynamicdialog'; // ✅ IMPORTAR
import { DynamicDialogModule } from 'primeng/dynamicdialog'; // ✅ IMPORTAR
import { DeleteComponent } from './components/delete/delete.component';

@NgModule({
  declarations: [
    AppComponent,
    PageCreateFormComponent,
    PageEditFormComponent,
    PageLoginComponent,
    LoginComponent,
    TableComponent,
    SidebarComponent,
    PageTableComponent,
    ArquivosComponent,
    PageArquivosComponent,
    HeaderComponent,
    UsuarioComponent,
    PageUserComponent,
    CadastroColecoesComponent,
    CadastroTiposDocumentosComponent,
    PageCadastroTipoComponent,
    PageCadastroColecaoComponent,
    PageColecoesComponent,
    PageTiposComponent,
    TiposDocumentosListComponent,
    ColecoesListComponent,
    DeleteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    SidebarModule,
    DropdownModule,
    CalendarModule,
    TooltipModule,
    TabViewModule,
    InputTextareaModule,
    FileUploadModule,
    ToastModule,
    PaginatorModule,
    AvatarModule,
    MultiSelectModule,
    BadgeModule,
    CardModule,
    DividerModule,
    TagModule,
    EditorModule,
    BrowserModule,
    BrowserAnimationsModule, // ✅ OBRIGATÓRIO para PrimeNG
    DynamicDialogModule // ✅ NECESSÁRIO para usar dialogs
    
  ],
  providers: [ConfirmationService,MessageService,DialogService ],
  bootstrap: [AppComponent]
})
export class AppModule {}