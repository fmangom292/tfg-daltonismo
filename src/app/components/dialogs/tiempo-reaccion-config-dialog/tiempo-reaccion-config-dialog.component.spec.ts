import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiempoReaccionConfigDialogComponent } from './tiempo-reaccion-config-dialog.component';

describe('TiempoReaccionConfigDialogComponent', () => {
  let component: TiempoReaccionConfigDialogComponent;
  let fixture: ComponentFixture<TiempoReaccionConfigDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiempoReaccionConfigDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiempoReaccionConfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
