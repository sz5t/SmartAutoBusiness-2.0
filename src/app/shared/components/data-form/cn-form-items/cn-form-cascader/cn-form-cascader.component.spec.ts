import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFormCascaderComponent } from './cn-form-cascader.component';

describe('CnFormCascaderComponent', () => {
  let component: CnFormCascaderComponent;
  let fixture: ComponentFixture<CnFormCascaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnFormCascaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormCascaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
