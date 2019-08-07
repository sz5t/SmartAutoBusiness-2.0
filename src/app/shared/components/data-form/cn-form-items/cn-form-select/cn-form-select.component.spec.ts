import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFormSelectComponent } from './cn-form-select.component';

describe('CnFormSelectComponent', () => {
  let component: CnFormSelectComponent;
  let fixture: ComponentFixture<CnFormSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnFormSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
