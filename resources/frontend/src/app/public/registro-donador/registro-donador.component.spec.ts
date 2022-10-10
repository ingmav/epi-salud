import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDonadorComponent } from './registro-donador.component';

describe('RegistroDonadorComponent', () => {
  let component: RegistroDonadorComponent;
  let fixture: ComponentFixture<RegistroDonadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroDonadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroDonadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
