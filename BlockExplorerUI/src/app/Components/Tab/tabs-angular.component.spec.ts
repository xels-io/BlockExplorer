import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAngComponent } from './tabs-angular.component';

describe('TabAngComponent', () => {
  let component: TabAngComponent;
  let fixture: ComponentFixture<TabAngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabAngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
