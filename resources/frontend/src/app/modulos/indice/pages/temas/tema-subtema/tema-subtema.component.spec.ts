import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemaSubtemaComponent } from './tema-subtema.component';

describe('TemaSubtemaComponent', () => {
  let component: TemaSubtemaComponent;
  let fixture: ComponentFixture<TemaSubtemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemaSubtemaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemaSubtemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
