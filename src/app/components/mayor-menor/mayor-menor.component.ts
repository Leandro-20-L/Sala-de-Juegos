import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mayor-menor',
  imports: [],
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.scss'
})
export class MayorMenorComponent {
   baraja: { valor: number, img: string }[] = [];
  cartaActual: { valor: number, img: string } | null = null;
  cartaOculta: { valor: number, img: string } | null = null;
  puntos: number = 0;

  ngOnInit() {
    this.generarBaraja();
    this.iniciarJuego();
  }

  generarBaraja(){
    this.baraja= [];
    const palos = ['Basto','Espada','Copa','Oro'];
    for (let palo of palos) {
      for (let i = 0; i <= 12; i++) {
        this.baraja.push({
          valor: i,
          img: `baraja/${palo}/${i}.jpg`

        })
        
      }
      
    }
    this.baraja.sort(() => Math.random() - 0.5);
  }

  iniciarJuego() {
    this.puntos = 0;
    this.cartaActual = this.baraja.pop() || null;
    this.sacarNuevaOculta();
  }

  sacarNuevaOculta() {
    this.cartaOculta = this.baraja.pop() || null;
  }

  elegir(opcion : 'mayor'| 'menor'){
    if (!this.cartaActual || !this.cartaOculta) return;

    let acierto = false;
    if (opcion === 'mayor' && this.cartaOculta.valor >= this.cartaActual.valor) {
      acierto = true;
    }
    if (opcion === 'menor' && this.cartaOculta.valor <= this.cartaActual.valor) {
      acierto = true;
    }

    if (acierto) {
      this.puntos++;
      this.cartaActual = this.cartaOculta;
      this.sacarNuevaOculta();
    } else {
      Swal.fire({
        title: '¡Juego terminado!',
        text: `Fallaste . Tu puntaje fue: ${this.puntos}`,
        icon: 'error',
        confirmButtonText: 'Reintentar'
      }).then(() => {
        this.generarBaraja();
        this.iniciarJuego();
      });
    }
  }
  }

