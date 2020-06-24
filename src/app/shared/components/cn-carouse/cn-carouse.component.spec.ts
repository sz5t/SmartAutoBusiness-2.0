import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnCarouseComponent } from './cn-carouse.component';

describe('CnCarouseComponent', () => {
  let component: CnCarouseComponent;
  let fixture: ComponentFixture<CnCarouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnCarouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnCarouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
