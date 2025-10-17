import { Component } from '@angular/core';
import { PreguntadosService } from '../../../services/preguntados.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Pregunta } from '../../../models/pregunta';
import { ResultadosService } from '../../../services/resultados.service';

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
  victoria : boolean  = false; 
  categoriasUsadas: string[] = [];
   categorias: string[] = [
    "geography",
    "arts%26literature",
    "entertainment",
    //"science%26nature",
    "sports%26leisure",
    "history"
  ];

  constructor (private service: PreguntadosService, private resultadosService :ResultadosService){}

  ngOnInit(): void {
    const categoriaRandom = this.getCategoriaRandom();
    this.cargarPreguntas(categoriaRandom);
    console.log(categoriaRandom);
  }

  async responder(opcion: string) {
    const pregunta = this.preguntas[this.indice];

    if (opcion === pregunta.correctAnswers) {
      this.puntaje++;
      Swal.fire(' Correcto', '¡Muy bien!', 'success');
       if (this.puntaje === 10 && !this.victoria) {
          this.victoria = true;
          await this.resultadosService.guardarResultado(this.puntaje, this.victoria, 'Preguntados');
          
          Swal.fire({
            title: ' ¡Victoria alcanzada!',
            text: '¡Has llegado a 10 respuestas correctas! Podés seguir jugando para mejorar tu puntaje.',
            icon: 'success',
            confirmButtonText: 'Seguir jugando',
            background: '#1a1a1a',
            color: '#fff'
          });
        } 
    } else {
      this.vidas--;
      Swal.fire(' Incorrecto', `La respuesta correcta era: ${pregunta.correctAnswers}`, 'error');
    }

    this.indice++;

    if (this.vidas <= 0) {
        if (!this.victoria) {
          this.victoria = false;
        }
    await this.resultadosService.guardarResultado(this.puntaje, this.victoria, 'Preguntados');

    Swal.fire({
      title: ' Fin del juego',
      text: `Te quedaste sin vidas.\nPuntaje final: ${this.puntaje}`,
      icon: 'error',
      confirmButtonText: 'Reintentar'
    }).then(() => this.reiniciarJuego());
    return;
  }

    if (this.indice >= this.preguntas.length) {
    const nuevaCategoria = this.getCategoriaRandom();
    this.cargarPreguntas(nuevaCategoria);
    this.indice = 0;
    Swal.fire({
      title: ' Nueva ronda',
      text: '¡Sigue jugando! Nuevas preguntas cargadas.',
      icon: 'info',
      timer: 1500,
      showConfirmButton: false
    });
  }
  }

  terminarJuego(perdio: boolean) {
  const mensaje = perdio
    ? `Te quedaste sin vidas.\nPuntaje final: ${this.puntaje}`
    : `Juego completado.\nPuntaje final: ${this.puntaje}`;

  Swal.fire({
    title: perdio ? ' Fin del juego' : 'S Victoria',
    text: mensaje,
    icon: perdio ? 'error' : 'success',
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
    this.service.getPreguntas(10, 2, categoria).subscribe({
      next: (data) => {
        this.preguntas = data.questions
        .filter((p) => this.esPreguntaValida(p))
        .map((p: Pregunta) => ({
          ...p,
          opciones: this.shuffle([p.correctAnswers, ...p.incorrectAnswers])
          
        }));
        console.log(data.questions);
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
       const disponibles = this.categorias.filter(c => !this.categoriasUsadas.includes(c));

      
      if (disponibles.length === 0) {
        this.categoriasUsadas = [];
        disponibles.push(...this.categorias);
      }

      const randomIndex = Math.floor(Math.random() * disponibles.length);
      const categoriaSeleccionada = disponibles[randomIndex];

      this.categoriasUsadas.push(categoriaSeleccionada);

      return categoriaSeleccionada;
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
