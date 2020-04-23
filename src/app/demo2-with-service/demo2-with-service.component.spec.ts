import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Demo2WithServiceComponent } from './demo2-with-service.component';

describe('Demo2WithServiceComponent', () => {
  let component: Demo2WithServiceComponent;
  let fixture: ComponentFixture<Demo2WithServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Demo2WithServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Demo2WithServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
