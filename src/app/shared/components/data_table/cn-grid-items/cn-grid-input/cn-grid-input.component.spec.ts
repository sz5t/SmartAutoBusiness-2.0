import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnGridInputComponent } from './cn-grid-input.component';

describe('CnGridInputComponent', () => {
  let component: CnGridInputComponent;
  let fixture: ComponentFixture<CnGridInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnGridInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnGridInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
