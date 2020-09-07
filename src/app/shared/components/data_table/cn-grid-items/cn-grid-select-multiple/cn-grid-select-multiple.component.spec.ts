import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnGridSelectMultipleComponent } from './cn-grid-select-multiple.component';

describe('CnGridSelectMultipleComponent', () => {
  let component: CnGridSelectMultipleComponent;
  let fixture: ComponentFixture<CnGridSelectMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnGridSelectMultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnGridSelectMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
