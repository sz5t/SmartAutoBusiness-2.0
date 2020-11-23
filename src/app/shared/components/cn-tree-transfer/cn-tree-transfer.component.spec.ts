import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnTreeTransferComponent } from './cn-tree-transfer.component';

describe('CnTreeTransferComponent', () => {
  let component: CnTreeTransferComponent;
  let fixture: ComponentFixture<CnTreeTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnTreeTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnTreeTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
