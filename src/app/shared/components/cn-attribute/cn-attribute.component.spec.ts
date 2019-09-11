import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnAttributeComponent } from './cn-attribute.component';

describe('CnAttributeComponent', () => {
  let component: CnAttributeComponent;
  let fixture: ComponentFixture<CnAttributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnAttributeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
