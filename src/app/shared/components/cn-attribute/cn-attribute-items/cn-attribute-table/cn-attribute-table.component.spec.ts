import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnAttributeTableComponent } from './cn-attribute-table.component';

describe('CnAttributeTableComponent', () => {
  let component: CnAttributeTableComponent;
  let fixture: ComponentFixture<CnAttributeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnAttributeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnAttributeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
