import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnCustomIconStateComponent } from './cn-custom-icon-state.component';

describe('CnCustomIconStateComponent', () => {
  let component: CnCustomIconStateComponent;
  let fixture: ComponentFixture<CnCustomIconStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnCustomIconStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnCustomIconStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
