import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFormTransferComponent } from './cn-form-transfer.component';

describe('CnFormTransferComponent', () => {
  let component: CnFormTransferComponent;
  let fixture: ComponentFixture<CnFormTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnFormTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
