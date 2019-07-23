import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgFromLayoutColComponent } from './cfg-form-layout-col.component';

describe('CfgFromLayoutColComponent', () => {
  let component: CfgFromLayoutColComponent;
  let fixture: ComponentFixture<CfgFromLayoutColComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgFromLayoutColComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgFromLayoutColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
