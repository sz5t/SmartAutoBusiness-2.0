import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnGridGridSelectComponent } from './cn-grid-grid-select.component';

describe('CnGridGridSelectComponent', () => {
  let component: CnGridGridSelectComponent;
  let fixture: ComponentFixture<CnGridGridSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnGridGridSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnGridGridSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
