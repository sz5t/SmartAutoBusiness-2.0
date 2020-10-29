import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnCustomGroupStateComponent } from './cn-custom-group-state.component';

describe('CnCustomGroupStateComponent', () => {
  let component: CnCustomGroupStateComponent;
  let fixture: ComponentFixture<CnCustomGroupStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnCustomGroupStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnCustomGroupStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
