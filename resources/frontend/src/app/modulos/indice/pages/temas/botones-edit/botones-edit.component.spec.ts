import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonesEditComponent } from './botones-edit.component';

describe('BotonesEditComponent', () => {
  let component: BotonesEditComponent;
  let fixture: ComponentFixture<BotonesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonesEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BotonesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
