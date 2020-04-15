import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureHomeComponent } from './configure-home.component';

describe('ConfigureHomeComponent', () => {
  let component: ConfigureHomeComponent;
  let fixture: ComponentFixture<ConfigureHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
