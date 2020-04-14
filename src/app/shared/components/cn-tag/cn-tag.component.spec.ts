import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnTagComponent } from './cn-tag.component';

describe('CnTagComponent', () => {
  let component: CnTagComponent;
  let fixture: ComponentFixture<CnTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
