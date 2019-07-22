import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RichAddressComponent } from './rich-address.component';

describe('RichAddressComponent', () => {
  let component: RichAddressComponent;
  let fixture: ComponentFixture<RichAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RichAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RichAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
