/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LiveDataComponent } from './LiveData.component';

describe('NgxDataTableContainerComponent', () => {
  let component: LiveDataComponent;
  let fixture: ComponentFixture<LiveDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
