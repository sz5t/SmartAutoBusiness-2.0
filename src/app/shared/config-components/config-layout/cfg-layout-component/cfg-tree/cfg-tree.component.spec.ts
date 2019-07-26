import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgTreeComponent } from './cfg-tree.component';

describe('CfgTreeComponent', () => {
  let component: CfgTreeComponent;
  let fixture: ComponentFixture<CfgTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
