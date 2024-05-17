import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtemaDialogComponent } from './subtema-dialog.component';

describe('SubtemaDialogComponent', () => {
  let component: SubtemaDialogComponent;
  let fixture: ComponentFixture<SubtemaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubtemaDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubtemaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
