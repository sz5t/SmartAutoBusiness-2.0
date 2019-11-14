import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnGridCustomSelectComponent } from './cn-grid-custom-select.component';

describe('CnGridCustomSelectComponent', () => {
  let component: CnGridCustomSelectComponent;
  let fixture: ComponentFixture<CnGridCustomSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnGridCustomSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnGridCustomSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
