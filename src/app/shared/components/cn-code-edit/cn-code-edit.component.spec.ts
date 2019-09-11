import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnCodeEditComponent } from './cn-code-edit.component';

describe('CnCodeEditComponent', () => {
  let component: CnCodeEditComponent;
  let fixture: ComponentFixture<CnCodeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnCodeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnCodeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
