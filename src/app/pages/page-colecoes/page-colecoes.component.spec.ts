/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageColecoesComponent } from './page-colecoes.component';

describe('PageColecoesComponent', () => {
  let component: PageColecoesComponent;
  let fixture: ComponentFixture<PageColecoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageColecoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageColecoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
