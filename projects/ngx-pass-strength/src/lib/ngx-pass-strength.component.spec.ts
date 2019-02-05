import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPassStrengthComponent } from './ngx-pass-strength.component';

describe('NgxPassStrengthComponent', () => {
  let component: NgxPassStrengthComponent;
  let fixture: ComponentFixture<NgxPassStrengthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxPassStrengthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxPassStrengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
