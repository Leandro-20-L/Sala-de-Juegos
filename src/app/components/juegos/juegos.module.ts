import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegosRoutingModule } from './juegos-routing.module';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { MortalClickComponent } from './mortal-click/mortal-click.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AhorcadoComponent,
    PreguntadosComponent,
    MayorMenorComponent,
    MortalClickComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    FormsModule
  ]
})
export class JuegosModule { }
