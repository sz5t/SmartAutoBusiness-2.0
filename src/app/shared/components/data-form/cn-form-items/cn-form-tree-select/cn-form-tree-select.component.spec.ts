import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFormTreeSelectComponent } from './cn-form-tree-select.component';

describe('CnFormTreeSelectComponent', () => {
  let component: CnFormTreeSelectComponent;
  let fixture: ComponentFixture<CnFormTreeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnFormTreeSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormTreeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
