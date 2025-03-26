/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageCreateFormComponent } from './page-create-form.component';

describe('PageCreateFormComponent', () => {
  let component: PageCreateFormComponent;
  let fixture: ComponentFixture<PageCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCreateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
