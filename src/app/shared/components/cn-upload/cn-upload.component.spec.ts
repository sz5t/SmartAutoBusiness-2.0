import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnUploadComponent } from './cn-upload.component';

describe('CnUploadComponent', () => {
  let component: CnUploadComponent;
  let fixture: ComponentFixture<CnUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
