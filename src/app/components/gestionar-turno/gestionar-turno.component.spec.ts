import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarTurnoComponent } from './gestionar-turno.component';

describe('GestionarTurnoComponent', () => {
  let component: GestionarTurnoComponent;
  let fixture: ComponentFixture<GestionarTurnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarTurnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
