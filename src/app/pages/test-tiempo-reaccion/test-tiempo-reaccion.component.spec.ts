import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTiempoReaccionComponent } from './test-tiempo-reaccion.component';

describe('TestTiempoReaccionComponent', () => {
  let component: TestTiempoReaccionComponent;
  let fixture: ComponentFixture<TestTiempoReaccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestTiempoReaccionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestTiempoReaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
