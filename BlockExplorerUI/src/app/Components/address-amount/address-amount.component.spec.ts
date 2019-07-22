import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressAmountComponent } from './address-amount.component';

describe('AddressAmountComponent', () => {
  let component: AddressAmountComponent;
  let fixture: ComponentFixture<AddressAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
