import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgAttributeObjectComponent } from './cfg-attribute-object.component';

describe('CfgAttributeObjectComponent', () => {
  let component: CfgAttributeObjectComponent;
  let fixture: ComponentFixture<CfgAttributeObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgAttributeObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgAttributeObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
