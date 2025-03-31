import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndTestComponent } from './end-test.component';

describe('EndTestComponent', () => {
  let component: EndTestComponent;
  let fixture: ComponentFixture<EndTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
