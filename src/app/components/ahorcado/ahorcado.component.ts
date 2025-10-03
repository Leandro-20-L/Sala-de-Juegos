import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ahorcado',
  imports: [FormsModule,CommonModule],
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

  ngOnInit() {
    this.nuevaPalabra();
  }

  nuevaPalabra() {
   
    this.palabra_actual = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    
    this.palabra_oculta = "_ ".repeat(this.palabra_actual.length).trim();
    
    
    this.letrasUsadas = [];
    this.intentos = 0;
    this.juegoTerminado = false;
    this.gano = false;
  }

  //aca se pushea las letras usadas y luego se compara si esta en la palabra actual se la recorre con 
  //un for y se guarda en un nuevo array y lueg  se une con la oculta 
  verificarLetra(letra: string) {
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
        this.juegoTerminado = true;
        this.gano = true;
      }

    } else {
      this.intentos++;
      if (this.intentos >= this.maxIntentos) {
        this.juegoTerminado = true;
        this.gano = false;
      }
    }
  }
}
