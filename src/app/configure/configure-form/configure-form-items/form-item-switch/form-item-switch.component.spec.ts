import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormItemSwitchComponent } from './form-item-switch.component';

describe('FormItemSwitchComponent', () => {
  let component: FormItemSwitchComponent;
  let fixture: ComponentFixture<FormItemSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormItemSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormItemSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
