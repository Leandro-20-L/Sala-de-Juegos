import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ResultadosService } from '../../../services/resultados.service';

@Component({
  standalone: false,
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.scss'
})
export class MayorMenorComponent {
   baraja: { valor: number, img: string }[] = [];
  cartaActual: { valor: number, img: string } | null = null;
  cartaOculta: { valor: number, img: string } | null = null;
  puntos: number = 0;
    vidas: number = 3;
  gano: boolean = false;
  juegoTerminado: boolean = false;

  constructor(private resultadosService: ResultadosService) {}
  ngOnInit() {
    this.generarBaraja();
    this.iniciarJuego();
  }

  generarBaraja(){
    this.baraja= [];
    const palos = ['Basto','Espada','Copa','Oro'];
    for (let palo of palos) {
      for (let i = 1; i <= 12; i++) {
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
    console.log(this.cartaActual?.valor);
    this.sacarNuevaOculta();
  }

  sacarNuevaOculta() {
    this.cartaOculta = this.baraja.pop() || null;
    console.log(this.cartaOculta?.valor);
  }

  async elegir(opcion : 'mayor'| 'menor' | 'igual'){
    if (!this.cartaActual || !this.cartaOculta) return;

    let acierto = false;

    if (opcion === 'mayor' && this.cartaOculta.valor >= this.cartaActual.valor) acierto = true;
    if (opcion === 'menor' && this.cartaOculta.valor <= this.cartaActual.valor) acierto = true;
    if (opcion === 'igual' && this.cartaOculta.valor === this.cartaActual.valor) acierto = true;
    
    if (acierto) {
      this.puntos++;
      this.cartaActual = this.cartaOculta;
      this.sacarNuevaOculta();

      if (this.puntos >= 20) {
        this.juegoTerminado = true;
        await this.resultadosService.guardarResultado(this.puntos, true, 'Mayor o Menor');
        Swal.fire({
          icon: 'success',
          title: ' ¡Ganaste!',
          text: `Adivinaste ${this.puntos} veces correctamente.`,
          confirmButtonText: 'Jugar de nuevo',
          background: '#1a1a1a',
          color: '#fff'
        }).then(() => {
          this.generarBaraja();
          this.iniciarJuego();
          this.vidas = 3;
        });
      }
    } else {
      this.vidas--;

      if (this.vidas > 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Fallaste',
          text: `Perdiste una vida. Te quedan ${this.vidas}.`,
          background: '#1a1a1a',
          color: '#fff'
        });
        this.cartaActual = this.cartaOculta;
        this.sacarNuevaOculta();
      } else {
       
        this.juegoTerminado = true;
        await this.resultadosService.guardarResultado(this.puntos, false, 'Mayor o Menor');
        Swal.fire({
          icon: 'error',
          title: ' Fin del juego',
          text: `Te quedaste sin vidas.\nPuntaje final: ${this.puntos}`,
          confirmButtonText: 'Reintentar',
          background: '#1a1a1a',
          color: '#fff'
        }).then(() => {
          this.generarBaraja();
          this.iniciarJuego();
          this.vidas = 3;
        });
      }
    }
  }
}