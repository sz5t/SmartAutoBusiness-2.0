import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgAttributeComponent } from './cfg-attribute.component';

describe('CfgAttributeComponent', () => {
  let component: CfgAttributeComponent;
  let fixture: ComponentFixture<CfgAttributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgAttributeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
