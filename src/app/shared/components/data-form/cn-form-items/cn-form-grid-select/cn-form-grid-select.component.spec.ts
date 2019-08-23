import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFormGridSelectComponent } from './cn-form-grid-select.component';

describe('CnFormGridSelectComponent', () => {
  let component: CnFormGridSelectComponent;
  let fixture: ComponentFixture<CnFormGridSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnFormGridSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormGridSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
