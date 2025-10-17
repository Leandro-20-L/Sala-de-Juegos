import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ResultadosService } from '../../../services/resultados.service';

@Component({
  standalone: false,
  selector: 'app-ahorcado',
  
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.scss'
})
export class AhorcadoComponent implements OnInit {
  letras: string[] = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  
  palabras: string[] = [    
    "ELEFANTE","COMPUTADORA","JIRAFA","BICICLETA","TELEFONO",     
    "HIPOPOTAMO","ESTUDIANTE","AUTOMOVIL","LAMPARA","REFRIGERADOR",     
    "MARIPOSA","ALMOHADA","DICCIONARIO","PINTURA","SAXOFON",     
    "HELICOPTERO","PARAGUAS","MARTILLO","TORNILLO","UNIVERSIDAD",     
    "TELEVISION","CALCULADORA","MURCIELAGO","AVION","ALCALDE"
  ];

  imagenes: string[] = [
    "ahorcadoImgs/1.png","ahorcadoImgs/2.png","ahorcadoImgs/3.png",
    "ahorcadoImgs/4.png","ahorcadoImgs/5.png","ahorcadoImgs/6.png","ahorcadoImgs/7.png"
  ];

  palabra_actual: string = '';
  palabra_oculta: string = '';
  letrasUsadas: string[] = [];
  intentos: number = 0;
  maxIntentos: number = this.imagenes.length - 1;
  juegoTerminado: boolean = false;
  gano: boolean = false;
  puntaje : number = 0; 
  vidas  : number = 3; 

    constructor(private resultadosService: ResultadosService) {}

  ngOnInit() {
    this.nuevaPalabra();
  }

  nuevaPalabra() {
   
    this.palabra_actual = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    console.log(this.palabra_actual)
    
    this.palabra_oculta = "_ ".repeat(this.palabra_actual.length).trim();
    
    
    this.letrasUsadas = [];
    this.intentos = 0;
    this.juegoTerminado = false;
    this.gano = false;
  }

  //aca se pushea las letras usadas y luego se compara si esta en la palabra actual se la recorre con 
  //un for y se guarda en un nuevo array y lueg  se une con la oculta 
  async verificarLetra(letra: string) {
    if (this.juegoTerminado || this.letrasUsadas.includes(letra)) return;

    this.letrasUsadas.push(letra);

    if (this.palabra_actual.includes(letra)) {
      let nueva = this.palabra_oculta.split(" ");
      for (let i = 0; i < this.palabra_actual.length; i++) {
        if (this.palabra_actual[i] === letra) {
          nueva[i] = letra;
           
        }
      }
      this.palabra_oculta = nueva.join(" ");

      
      if (!this.palabra_oculta.includes("_")) {
        this.puntaje++;

          if (this.puntaje >= 3) {
          this.juegoTerminado = true;
          this.gano = true;

          await this.resultadosService.guardarResultado(this.puntaje, this.gano, 'Ahorcado');

          Swal.fire({
            icon: 'success',
            title: '🏆 ¡Victoria!',
            text: `Adivinaste ${this.puntaje} palabras correctamente.`,
            confirmButtonText: 'Reiniciar',
            background: '#1a1a1a',
            color: '#fff'
          }).then(() => this.reiniciarJuego());

          return;
        }
        Swal.fire({
          icon: 'success',
          title: ' ¡Ganaste!',
          text: `La palabra era "${this.palabra_actual}"`,
          confirmButtonText: 'Siguiente palabra',
          background: '#1a1a1a',
          color: '#fff'
        }).then(() => this.nuevaPalabra());
         
      }

    } else {
      this.intentos++;
      if (this.intentos >= this.maxIntentos) {
       this.vidas--;

        if (this.vidas <= 0) {
          this.juegoTerminado = true;
          this.gano = false;
          await this.resultadosService.guardarResultado(this.puntaje, this.gano, 'Ahorcado');

           Swal.fire({
            icon: 'error',
            title: ' Fin del juego',
            text: 'Te has quedado sin vidas.',
            confirmButtonText: 'Reiniciar',
            background: '#1a1a1a',
            color: '#fff'
          }).then(() => this.reiniciarJuego());
        } else {
           Swal.fire({
            icon: 'warning',
            title: ' Fallaste',
            text: `Perdiste una vida. Te quedan ${this.vidas}`,
            background: '#1a1a1a',
            color: '#fff'
          }).then(() => this.nuevaPalabra());
        }
        
      }
    }
  }
  reiniciarJuego() {
    this.puntaje = 0;
    this.vidas = 3;
    this.nuevaPalabra();
  }
}
