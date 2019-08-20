import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFormSelectMultipleComponent } from './cn-form-select-multiple.component';

describe('CnFormSelectMultipleComponent', () => {
  let component: CnFormSelectMultipleComponent;
  let fixture: ComponentFixture<CnFormSelectMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnFormSelectMultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormSelectMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
