import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarPostulanteComponent } from './registrar-postulante.component';



describe('RegistrarPostulanteComponent', () => {
  let component: RegistrarPostulanteComponent;
  let fixture: ComponentFixture<RegistrarPostulanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarPostulanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarPostulanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
