import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPassStrengthComponent } from './ngx-pass-strength.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxPassStrengthService } from './ngx-pass-strength.service';
import { of } from 'rxjs';

const HIBP_DATA: string = `FE5CCB19BA61C4C0873D391E987982FBBD3:74831
FF36DC7D3284A39991ADA90CAF20D1E3C0D:1`;

describe('NgxPassStrengthComponent', () => {
  let component: NgxPassStrengthComponent;
  let fixture: ComponentFixture<NgxPassStrengthComponent>;
  let ngxPassStrengthService: NgxPassStrengthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxPassStrengthComponent ],
      providers: [
        NgxPassStrengthService
      ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxPassStrengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    ngxPassStrengthService = TestBed.get(NgxPassStrengthService);
    spyOn(ngxPassStrengthService, 'range').and.returnValue(of(HIBP_DATA));
  });
  
  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when input changes should update the strength value', () => {
    component.onStrengthChanged.subscribe((value) => {
      expect(value).toBe(17);
    });
    component.passwordToCheck = 'test';
    fixture.detectChanges();
  });
});
