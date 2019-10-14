import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnAttributeFormComponent } from './cn-attribute-form.component';

describe('CnAttributeFormComponent', () => {
  let component: CnAttributeFormComponent;
  let fixture: ComponentFixture<CnAttributeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnAttributeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnAttributeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
