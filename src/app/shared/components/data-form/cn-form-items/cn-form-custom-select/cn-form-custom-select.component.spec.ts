import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFormCustomSelectComponent } from './cn-form-custom-select.component';

describe('CnFormCustomSelectComponent', () => {
  let component: CnFormCustomSelectComponent;
  let fixture: ComponentFixture<CnFormCustomSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnFormCustomSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormCustomSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
