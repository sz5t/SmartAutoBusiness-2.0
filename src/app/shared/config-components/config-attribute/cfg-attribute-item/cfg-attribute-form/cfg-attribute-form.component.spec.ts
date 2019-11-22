import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgAttributeFormComponent } from './cfg-attribute-form.component';

describe('CfgAttributeFormComponent', () => {
  let component: CfgAttributeFormComponent;
  let fixture: ComponentFixture<CfgAttributeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgAttributeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgAttributeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
