/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageEditFormComponent } from './page-edit-form.component';

describe('PageEditFormComponent', () => {
  let component: PageEditFormComponent;
  let fixture: ComponentFixture<PageEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
