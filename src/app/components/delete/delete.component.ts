import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent  {
  itemName: string = '';

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {
    // Recebe o nome do item a ser excluído via config.data
    this.itemName = this.config.data?.itemName || 'este item';
  }

  confirmar(): void {
    this.ref.close(true); // Retorna true para indicar que a exclusão foi confirmada
  }

  cancelar(): void {
    this.ref.close(false); // Retorna false para indicar que a exclusão foi cancelada
  }
}
