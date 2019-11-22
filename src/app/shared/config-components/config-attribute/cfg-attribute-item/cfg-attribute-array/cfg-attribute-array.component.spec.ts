import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgAttributeArrayComponent } from './cfg-attribute-array.component';

describe('CfgAttributeArrayComponent', () => {
  let component: CfgAttributeArrayComponent;
  let fixture: ComponentFixture<CfgAttributeArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgAttributeArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgAttributeArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
