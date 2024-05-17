import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamicBarComponent } from './dinamic-bar.component';

describe('DinamicBarComponent', () => {
  let component: DinamicBarComponent;
  let fixture: ComponentFixture<DinamicBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DinamicBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DinamicBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
