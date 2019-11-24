import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFormSelectComponent } from './cn-form-search-select.component';

describe('CnFormSearchSelectComponent', () => {
  let component: CnFormSearchSelectComponent;
  let fixture: ComponentFixture<CnFormSearchSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CnFormSearchSelectComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormSearchSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
