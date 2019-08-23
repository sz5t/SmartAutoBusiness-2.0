import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFormTextareaComponent } from './cn-form-textarea.component';

describe('CnFormTextareaComponent', () => {
  let component: CnFormTextareaComponent;
  let fixture: ComponentFixture<CnFormTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnFormTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
