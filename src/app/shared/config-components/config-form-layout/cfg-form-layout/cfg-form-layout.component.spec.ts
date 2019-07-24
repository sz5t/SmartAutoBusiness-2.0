import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgFromLayoutComponent } from './cfg-form-layout.component';

describe('CfgFromLayoutComponent', () => {
  let component: CfgFromLayoutComponent;
  let fixture: ComponentFixture<CfgFromLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgFromLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgFromLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
