import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaEditComponent } from './pagina-edit.component';

describe('PaginaEditComponent', () => {
  let component: PaginaEditComponent;
  let fixture: ComponentFixture<PaginaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
