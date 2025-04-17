/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageCadastroTipoComponent } from './page-cadastro-tipo.component';

describe('PageCadastroTipoComponent', () => {
  let component: PageCadastroTipoComponent;
  let fixture: ComponentFixture<PageCadastroTipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCadastroTipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCadastroTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
