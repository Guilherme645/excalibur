/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageCadastroColecaoComponent } from './page-cadastro-colecao.component';

describe('PageCadastroColecaoComponent', () => {
  let component: PageCadastroColecaoComponent;
  let fixture: ComponentFixture<PageCadastroColecaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCadastroColecaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCadastroColecaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
