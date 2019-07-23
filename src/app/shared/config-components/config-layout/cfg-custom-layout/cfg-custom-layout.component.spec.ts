import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgCustomLayoutComponent } from './cfg-custom-layout.component';

describe('CfgCustomLayoutComponent', () => {
  let component: CfgCustomLayoutComponent;
  let fixture: ComponentFixture<CfgCustomLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgCustomLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgCustomLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
