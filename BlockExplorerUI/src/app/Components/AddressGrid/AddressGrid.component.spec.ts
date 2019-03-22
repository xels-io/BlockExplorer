/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddressGridComponent } from './AddressGrid.component';

describe('AddressGridComponent', () => {
  let component: AddressGridComponent;
  let fixture: ComponentFixture<AddressGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
