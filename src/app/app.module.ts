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

@NgModule({
  declarations: [
    AppComponent,
    PageCreateFormComponent,
    PageEditFormComponent,
    PageLoginComponent,
    LoginComponent,
    TableComponent,
    SidebarComponent,
    PageTableComponent
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
    TabViewModule,
    InputTextareaModule,
    FileUploadModule // Adicionado
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule {}