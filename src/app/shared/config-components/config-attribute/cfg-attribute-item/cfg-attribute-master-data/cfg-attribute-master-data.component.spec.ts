import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgAttributeMasterDataComponent } from './cfg-attribute-master-data.component';

describe('CfgAttributeMasterDataComponent', () => {
  let component: CfgAttributeMasterDataComponent;
  let fixture: ComponentFixture<CfgAttributeMasterDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgAttributeMasterDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgAttributeMasterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
