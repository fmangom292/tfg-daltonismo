import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimuloComponent } from './estimulo.component';

describe('EstimuloComponent', () => {
  let component: EstimuloComponent;
  let fixture: ComponentFixture<EstimuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstimuloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstimuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
