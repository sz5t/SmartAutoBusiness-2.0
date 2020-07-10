import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnGridTreeSelectComponent } from './cn-grid-tree-select.component';

describe('CnGridTreeSelectComponent', () => {
  let component: CnGridTreeSelectComponent;
  let fixture: ComponentFixture<CnGridTreeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnGridTreeSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnGridTreeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
