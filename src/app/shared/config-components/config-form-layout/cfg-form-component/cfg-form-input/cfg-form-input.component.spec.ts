import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgFormInputComponent } from './cfg-form-input.component';

describe('CfgFormInputComponent', () => {
  let component: CfgFormInputComponent;
  let fixture: ComponentFixture<CfgFormInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgFormInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgFormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
