import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-page-create-form',
  templateUrl: './page-create-form.component.html',
  styleUrls: ['./page-create-form.component.css']
})
export class PageCreateFormComponent {
  documentForm: FormGroup;

  documentTypes = [
    { label: 'Ofício', value: 'Ofício' },
    { label: 'Relatório', value: 'Relatório' },
    { label: 'Ata', value: 'Ata' },
    { label: 'Contrato', value: 'Contrato' },
    { label: 'Outros', value: 'Outros' }
  ];

  categories = [
    { label: 'Corrente', value: 'Corrente' },
    { label: 'Intermediário', value: 'Intermediário' },
    { label: 'Permanente', value: 'Permanente' }
  ];

  accessLevels = [
    { label: 'Público', value: 'Público' },
    { label: 'Restrito', value: 'Restrito' },
    { label: 'Confidencial', value: 'Confidencial' },
    { label: 'Sigiloso', value: 'Sigiloso' }
  ];

  physicalSupports = [
    { label: 'Papel', value: 'Papel' },
    { label: 'CD', value: 'CD' },
    { label: 'Fita', value: 'Fita' },
    { label: 'Outros', value: 'Outros' }
  ];

  digitalFormats = [
    { label: 'PDF', value: 'PDF' },
    { label: 'DOCX', value: 'DOCX' },
    { label: 'JPG', value: 'JPG' },
    { label: 'Outros', value: 'Outros' }
  ];

  conservationConditions = [
    { label: 'Bom', value: 'Bom' },
    { label: 'Danificado', value: 'Danificado' },
    { label: 'Digitalizado', value: 'Digitalizado' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.documentForm = this.fb.group({
      title: ['', Validators.required],
      type: [''],
      protocolNumber: [''],
      creationDate: [new Date(), Validators.required],
      receiptDate: [''],
      originalDate: [''],
      producerName: [''],
      department: [''],
      responsible: [''],
      mainSubject: [''],
      description: [''],
      archivalCode: [''],
      category: [''],
      accessLevel: [''],
      restrictionPeriod: [''],
      legalBasis: [''],
      physicalSupport: [''],
      digitalFormat: [''],
      language: [''],
      storageLocation: [''],
      barcode: [''],
      boxNumber: [''],
      conservationCondition: [''],
      digitalFile: [''],
      observations: [''],
      digitizedBy: [''],
      digitizationDate: [''],
      registeredBy: [''],
      registrationDate: [new Date()],
      digitalSignature: ['']
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.documentForm.patchValue({ digitalFile: input.files[0].name });
    }
  }

  saveDocument() {
    if (this.documentForm.invalid) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }
    console.log('Documento salvo:', this.documentForm.value);
    this.router.navigate(['/documents']);
  }

  cancel() {
    this.router.navigate(['/documents']);
  }
}