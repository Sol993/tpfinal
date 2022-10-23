import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoespecialidadesComponent } from './listadoespecialidades.component';

describe('ListadoespecialidadesComponent', () => {
  let component: ListadoespecialidadesComponent;
  let fixture: ComponentFixture<ListadoespecialidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoespecialidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoespecialidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
