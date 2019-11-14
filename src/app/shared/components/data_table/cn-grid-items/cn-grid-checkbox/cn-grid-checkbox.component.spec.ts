import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnGridCheckboxComponent } from './cn-grid-checkbox.component';

describe('CnGridCheckboxComponent', () => {
  let component: CnGridCheckboxComponent;
  let fixture: ComponentFixture<CnGridCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnGridCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnGridCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
