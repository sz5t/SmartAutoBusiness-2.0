import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnAttributeObjectComponent } from './cn-attribute-object.component';

describe('CnAttributeObjectComponent', () => {
  let component: CnAttributeObjectComponent;
  let fixture: ComponentFixture<CnAttributeObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnAttributeObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnAttributeObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
