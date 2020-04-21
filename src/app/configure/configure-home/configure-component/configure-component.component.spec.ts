import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureComponentComponent } from './configure-component.component';

describe('ConfigureComponentComponent', () => {
  let component: ConfigureComponentComponent;
  let fixture: ComponentFixture<ConfigureComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
