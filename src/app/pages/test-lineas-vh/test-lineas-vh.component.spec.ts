import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestLineasVHComponent } from './test-lineas-vh.component';

describe('TestLineasVHComponent', () => {
  let component: TestLineasVHComponent;
  let fixture: ComponentFixture<TestLineasVHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestLineasVHComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestLineasVHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
