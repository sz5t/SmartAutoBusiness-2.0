import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgToolbarComponent } from './cfg-toolbar.component';

describe('CfgToolbarComponent', () => {
  let component: CfgToolbarComponent;
  let fixture: ComponentFixture<CfgToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
