import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnDataFormComponent } from './cn-data-form.component';

describe('CnDataFormComponent', () => {
  let component: CnDataFormComponent;
  let fixture: ComponentFixture<CnDataFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnDataFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
