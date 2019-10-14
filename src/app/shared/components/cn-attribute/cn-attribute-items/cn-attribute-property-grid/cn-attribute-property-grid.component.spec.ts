import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnAttributePropertyGridComponent } from './cn-attribute-property-grid.component';

describe('CnAttributePropertyGridComponent', () => {
  let component: CnAttributePropertyGridComponent;
  let fixture: ComponentFixture<CnAttributePropertyGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnAttributePropertyGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnAttributePropertyGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
