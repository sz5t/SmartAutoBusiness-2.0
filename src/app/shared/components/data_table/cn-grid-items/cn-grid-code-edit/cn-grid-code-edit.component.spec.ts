import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnGridCodeEditComponent } from './cn-grid-code-edit.component';

describe('CnGridCodeEditComponent', () => {
  let component: CnGridCodeEditComponent;
  let fixture: ComponentFixture<CnGridCodeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnGridCodeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnGridCodeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
