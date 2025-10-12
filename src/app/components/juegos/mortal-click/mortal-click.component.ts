import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

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

     modos = [
    { nombre: 'Fácil (10s)', tiempo: 10 },
    { nombre: 'Normal (5s)', tiempo: 5 },
    { nombre: 'Difícil (2s)', tiempo: 2 }
  ];

  iniciarJuego(segundos:number){
    this.tiempoRestante = segundos;
    this.puntaje = 0; 
    this.jugando = true;

    this.interval = setInterval(() => {
      this.tiempoRestante--;
      if(this.tiempoRestante <= 0){
        this.terminarJuego();

      }
    },1000)
  }

  clickear(){
    if (this.jugando) {
      this.puntaje++;
    }
  }

  terminarJuego(){
    clearInterval(this.interval);
    this.jugando = false;

    let mensaje = '';
    let icono : 'success' | 'error' | 'warning' | 'info' | 'question' = 'info';
    if (this.puntaje < 10) {
      mensaje = 'Mediocre';
      icono = 'error';
    } else if (this.puntaje < 20) {
      mensaje = 'Aceptable ⚡';
      icono = 'warning';
    } else if (this.puntaje < 30) {
      mensaje = 'Fuerte 💪';
      icono = 'info';
    } else if (this.puntaje < 40) {
      mensaje = 'Perfecto';
      icono = 'success';
    }
    else {
      mensaje = '🔥 ¡CLICK MORTAL! 🔥';
      icono = 'success';
    }

     Swal.fire({
      title: 'Tiempo terminado',
      text: `Hiciste ${this.puntaje} clicks. ${mensaje}`,
      icon: icono,
      confirmButtonText: 'Reintentar'
    });
    
  }
}
