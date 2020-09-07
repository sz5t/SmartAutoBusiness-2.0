import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnContainersComponent } from './cn-containers.component';

describe('CnContainersComponent', () => {
  let component: CnContainersComponent;
  let fixture: ComponentFixture<CnContainersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnContainersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnContainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
