import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnAttributeTableFormComponent } from './cn-attribute-table-form.component';

describe('CnAttributeTableFormComponent', () => {
  let component: CnAttributeTableFormComponent;
  let fixture: ComponentFixture<CnAttributeTableFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnAttributeTableFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnAttributeTableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
