import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulanteDetalleComponent } from './postulante-detalle.component';

describe('PostulanteDetalleComponent', () => {
  let component: PostulanteDetalleComponent;
  let fixture: ComponentFixture<PostulanteDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostulanteDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostulanteDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
