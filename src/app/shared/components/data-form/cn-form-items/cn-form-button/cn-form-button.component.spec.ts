import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFormLabelComponent } from './cn-form-button.component';

describe('CnFormLabelComponent', () => {
  let component: CnFormLabelComponent;
  let fixture: ComponentFixture<CnFormLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CnFormLabelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
