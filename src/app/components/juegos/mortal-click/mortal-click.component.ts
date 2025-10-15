import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ResultadosService } from '../../../services/resultados.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone:false,
  selector: 'app-mortal-click',
  
  templateUrl: './mortal-click.component.html',
  styleUrl: './mortal-click.component.scss'
})
export class MortalClickComponent {
   tiempoRestante: number = 0;
    puntaje: number = 0;
    jugando: boolean = false;
    interval: any;
    resistencia: number = 0; 
    resistenciaInicial: number = 0;

     modos = [
    { nombre: 'Fácil (10s)', tiempo: 10, resistencia: 50 },
    { nombre: 'Normal (5s)', tiempo: 5, resistencia: 75 },
    { nombre: 'Difícil (2s)', tiempo: 2, resistencia: 100 }
  ];
  constructor(
  private resultadosService: ResultadosService,
  private authService: AuthService
) {}

  iniciarJuego(segundos:number , resistencia:number){
    this.tiempoRestante = segundos;
    this.puntaje = 0; 
    this.jugando = true;
    this.resistencia = resistencia;
    this.resistenciaInicial= resistencia;
    

    this.interval = setInterval(() => {
      this.tiempoRestante--;
      if(this.tiempoRestante <= 0){
        this.terminarJuego(false);

      }
    },1000)
  }

  clickear(){
    if (this.jugando) {
      this.puntaje++;
      this.resistencia -= 2; 
      if (this.resistencia <= 0) {
        this.terminarJuego(true); 
      }
    }
  }

  async terminarJuego(victoria : boolean){
    clearInterval(this.interval);
    this.jugando = false;

     try {
    
    await this.resultadosService.guardarResultado(this.puntaje, victoria, 'Mortal Click');
  } catch (error) {
    console.error('Error al guardar resultado:', error);
  }

    if (victoria) {
      Swal.fire({
        title: '🔥 ¡LO ROMPISTE! 🔥',
        text: 'Tu poder es legendario 💪',
        icon: 'success',
        confirmButtonText: 'Reintentar'
      });
    } else {
      Swal.fire({
        title: '❌ Tiempo agotado',
        text: 'El objeto resistió tu poder...',
        icon: 'error',
        confirmButtonText: 'Reintentar'
      });
    }
    
  }
   get progreso() {
    return ((this.resistenciaInicial - this.resistencia) / this.resistenciaInicial) * 100;
  }
}
