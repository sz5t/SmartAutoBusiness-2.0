import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnAttributeArrayComponent } from './cn-attribute-array.component';

describe('CnAttributeArrayComponent', () => {
  let component: CnAttributeArrayComponent;
  let fixture: ComponentFixture<CnAttributeArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnAttributeArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnAttributeArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
