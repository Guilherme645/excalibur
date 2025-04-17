/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageTiposComponent } from './page-tipos.component';

describe('PageTiposComponent', () => {
  let component: PageTiposComponent;
  let fixture: ComponentFixture<PageTiposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageTiposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
