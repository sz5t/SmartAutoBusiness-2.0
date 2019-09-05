import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnGridSelectComponent } from './cn-grid-select.component';

describe('CnGridSelectComponent', () => {
  let component: CnGridSelectComponent;
  let fixture: ComponentFixture<CnGridSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnGridSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnGridSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
