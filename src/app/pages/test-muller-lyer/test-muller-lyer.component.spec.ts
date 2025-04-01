import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMullerLyerComponent } from './test-muller-lyer.component';

describe('TestMullerLyerComponent', () => {
  let component: TestMullerLyerComponent;
  let fixture: ComponentFixture<TestMullerLyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestMullerLyerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestMullerLyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
