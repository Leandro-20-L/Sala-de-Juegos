import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { EncuestasService } from '../../services/encuestas.service';

@Component({
  selector: 'app-encuestas',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './encuestas.component.html',
  styleUrl: './encuestas.component.scss'
})
export class EncuestasComponent {
  encuestaForm!: FormGroup;

  constructor(private fb: FormBuilder, private encuestasService: EncuestasService) {
    this.encuestaForm = this.fb.group({
      nombre_apellido: ['', [Validators.required, Validators.minLength(3)]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{1,10}$')]],
      pregunta1: ['', Validators.required],
      pregunta2: ['', Validators.required],
      pregunta3: [[], Validators.required]
    });
  }

  get f() {
    return this.encuestaForm.controls;
  }

  actualizarCheck(event: any) {
    const seleccionadas = this.encuestaForm.value.pregunta3 || [];
    if (event.target.checked) {
      seleccionadas.push(event.target.value);
    } else {
      const index = seleccionadas.indexOf(event.target.value);
      if (index > -1) seleccionadas.splice(index, 1);
    }

    this.encuestaForm.patchValue({ pregunta3: seleccionadas });
    this.encuestaForm.get('pregunta3')?.updateValueAndValidity();
  }

  async enviarEncuesta() {
    if (this.encuestaForm.invalid) {
      this.encuestaForm.markAllAsTouched();
      return;
    }

    console.log('✅ Datos enviados:', this.encuestaForm.value);

      try {
    const encuesta = this.encuestaForm.value;

    
    const nuevaEncuesta = await this.encuestasService.insertarEncuesta(encuesta);

    
    const respuestas = [
      { pregunta: '¿Pregunta 1?', tipo_control: 'radio', respuesta: encuesta.pregunta1 },
      { pregunta: '¿Pregunta 2?', tipo_control: 'select', respuesta: encuesta.pregunta2 },
      { pregunta: '¿Pregunta 3?', tipo_control: 'checkbox', respuesta: encuesta.pregunta3.join(', ') }
    ];

    await this.encuestasService.insertarRespuestas(nuevaEncuesta.id, respuestas);

    
    Swal.fire({
      icon: 'success',
      title: '¡Gracias por participar!',
      text: 'Tu encuesta fue enviada correctamente 🎉',
      confirmButtonText: 'Aceptar',
      background: '#1a1a1a',
      color: '#fff'
    });

    this.encuestaForm.reset();

  } catch (error) {
    console.error('❌ Error al guardar encuesta:', error);

    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo enviar la encuesta. Intenta nuevamente.',
      confirmButtonText: 'Aceptar'
    });
  }
  }
}
