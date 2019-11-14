import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnGridSwitchComponent } from './cn-grid-switch.component';

describe('CnGridSwitchComponent', () => {
  let component: CnGridSwitchComponent;
  let fixture: ComponentFixture<CnGridSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnGridSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnGridSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
