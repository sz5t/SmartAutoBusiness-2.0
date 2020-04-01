import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFormGroupComponent } from './cn-form-group.component';

describe('CnFormGroupComponent', () => {
  let component: CnFormGroupComponent;
  let fixture: ComponentFixture<CnFormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CnFormGroupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
