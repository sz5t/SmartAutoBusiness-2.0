import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnPageComponent } from './cn-page.component';

describe('CnPageComponent', () => {
  let component: CnPageComponent;
  let fixture: ComponentFixture<CnPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
