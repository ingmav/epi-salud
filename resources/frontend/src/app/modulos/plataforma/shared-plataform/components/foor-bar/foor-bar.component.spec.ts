import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoorBarComponent } from './foor-bar.component';

describe('FoorBarComponent', () => {
  let component: FoorBarComponent;
  let fixture: ComponentFixture<FoorBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoorBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoorBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
