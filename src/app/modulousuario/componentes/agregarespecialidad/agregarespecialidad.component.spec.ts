import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarespecialidadComponent } from './agregarespecialidad.component';

describe('AgregarespecialidadComponent', () => {
  let component: AgregarespecialidadComponent;
  let fixture: ComponentFixture<AgregarespecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarespecialidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarespecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
