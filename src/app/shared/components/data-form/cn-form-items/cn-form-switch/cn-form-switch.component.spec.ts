import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFormSwitchComponent } from './cn-form-switch.component';

describe('CnFormSwitchComponent', () => {
  let component: CnFormSwitchComponent;
  let fixture: ComponentFixture<CnFormSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnFormSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
