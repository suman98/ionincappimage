import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateconveterPage } from './dateconveter.page';

describe('DateconveterPage', () => {
  let component: DateconveterPage;
  let fixture: ComponentFixture<DateconveterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateconveterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateconveterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
