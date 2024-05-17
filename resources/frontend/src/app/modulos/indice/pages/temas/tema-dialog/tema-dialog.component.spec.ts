import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemaDialogComponent } from './tema-dialog.component';

describe('TemaDialogComponent', () => {
  let component: TemaDialogComponent;
  let fixture: ComponentFixture<TemaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemaDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
