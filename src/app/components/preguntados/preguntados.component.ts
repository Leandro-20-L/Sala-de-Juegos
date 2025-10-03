import { Component } from '@angular/core';
import { PreguntadosService } from '../../services/preguntados.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Pregunta } from '../../models/pregunta';

@Component({
  selector: 'app-preguntados',
  imports: [CommonModule],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.scss'
})
export class PreguntadosComponent {
  preguntas: Pregunta[] = [];
  puntaje = 0;
  indice = 0; 

  constructor (private service: PreguntadosService){

  }

  ngOnInit(): void {
    this.service.getPreguntas(5, 1, "geography").subscribe({
      next: (data) => {
        console.log("📥 Preguntas recibidas:", data.questions);

       
        this.preguntas = data.questions.map((p: Pregunta) => ({
          ...p,
          opciones: this.shuffle([p.correctAnswers, ...p.incorrectAnswers])
        }));
      },
      error: (err) => {
        console.error("❌ Error al obtener preguntas:", err);
      }
    });
  }

  responder(opcion: string) {
    const pregunta = this.preguntas[this.indice];

    if (opcion === pregunta.correctAnswers) {
      this.puntaje++;
      Swal.fire('✅ Correcto', '¡Muy bien!', 'success');
    } else {
      Swal.fire('❌ Incorrecto', `La respuesta correcta era: ${pregunta.correctAnswers}`, 'error');
    }

    this.indice++;
    if (this.indice >= this.preguntas.length) {
      Swal.fire('🎉 Juego terminado', `Tu puntaje fue: ${this.puntaje}/${this.preguntas.length}`, 'info');
      this.indice = 0;
      this.puntaje = 0;
    }
  }

 getOpciones(pregunta: Pregunta): string[] {
  if (!pregunta) return []; 
  return this.shuffle([pregunta.correctAnswers, ...pregunta.incorrectAnswers]);
}
shuffle(array: any[]): any[] {
  return array.sort(() => Math.random() - 0.5);
}
}
