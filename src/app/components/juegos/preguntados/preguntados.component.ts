import { Component } from '@angular/core';
import { PreguntadosService } from '../../../services/preguntados.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Pregunta } from '../../../models/pregunta';

@Component({
  standalone : false,
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.scss'
})
export class PreguntadosComponent {
  preguntas: Pregunta[] = [];
  puntaje = 0;
  indice = 0; 
  vidas = 3;
   categorias: string[] = [
    "geography",
    "arts%26literature",
    "entertainment",
    "science%26nature",
    "sports%26leisure",
    "history"
  ];

  constructor (private service: PreguntadosService){}

  ngOnInit(): void {
    const categoriaRandom = this.getCategoriaRandom();
    this.cargarPreguntas(categoriaRandom);
    console.log(categoriaRandom);
  }

  responder(opcion: string) {
    const pregunta = this.preguntas[this.indice];

    if (opcion === pregunta.correctAnswers) {
      this.puntaje++;
      Swal.fire('✅ Correcto', '¡Muy bien!', 'success');
    } else {
      this.vidas--;
      Swal.fire(' Incorrecto', `La respuesta correcta era: ${pregunta.correctAnswers}`, 'error');
    }

    this.indice++;
    if (this.vidas <= 0) {
      this.terminarJuego(false);
    } else if (this.indice >= this.preguntas.length) {
      this.terminarJuego(true);
    }
  }

  terminarJuego(completo: boolean) {
    const mensaje = completo
      ? ` Juego completado!\nPuntaje final: ${this.puntaje}`
      : ` Te quedaste sin vidas.\nPuntaje final: ${this.puntaje}`;

    Swal.fire({
      title: 'Fin del juego',
      text: mensaje,
      icon: completo ? 'success' : 'error',
      confirmButtonText: 'Reintentar'
    }).then(() => {
      this.reiniciarJuego();
    });
  }

   reiniciarJuego() {
    this.indice = 0;
    this.puntaje = 0;
    this.vidas = 3;

    const nuevaCategoria = this.getCategoriaRandom();
    this.cargarPreguntas(nuevaCategoria);
  }

  // y aca mapeo lo que me trae la api mezclando answer correcta con la incorrecta

  private cargarPreguntas(categoria: string) {
    this.service.getPreguntas(10, 2, "history").subscribe({
      next: (data) => {
        this.preguntas = data.questions
        .filter((p) => this.esPreguntaValida(p))
        .map((p: Pregunta) => ({
          ...p,
          opciones: this.shuffle([p.correctAnswers, ...p.incorrectAnswers])
          
        }));
        
      },
      error: (err) => {
        console.error(" Error al obtener preguntas:", err);
      }
    });
  }

  shuffle(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }

  getCategoriaRandom(): string {
      const i = Math.floor(Math.random() * this.categorias.length);
      return this.categorias[i];
    }

  
  private esPreguntaValida(pregunta: Pregunta): boolean {
  const texto = pregunta.question?.toLowerCase() || '';

  
  if (pregunta.format === 'boolean') return false;

  
  if (pregunta.incorrectAnswers?.length === 1) return false;

  
  //if (texto.length < 10) return false;

  
  if (/^\d+$/.test(texto) || /\b\d{3,4}\b/.test(texto)) return false;


  if (/¿.*(año|fecha|siglo|época)/i.test(texto)) return false;

 
  //if (!/[a-záéíóúñ]/i.test(texto)) return false;

  
  return true;
}
}
