import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap, of } from 'rxjs';
import { Pregunta } from '../models/pregunta';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {
  
   private apiUrl = 'https://api.quiz-contest.xyz/questions';
   private apiKey = '$2b$12$FGl56hl/yZQTH17MoxU1/.JTpsRV6XElvVWaE8O.qscITST0n5Wwy';

  constructor(private http: HttpClient) {}


//esta function devuelve un observable
  getPreguntas(limit: number, page: number, categoria: string): Observable<{ questions: Pregunta[] }> {
  const headers = new HttpHeaders({'Authorization': this.apiKey });

  const url = `${this.apiUrl}?limit=${limit}&page=${page}&category=${categoria}`;
  return this.http.get<{ questions: Pregunta[] }>(url, { headers }).pipe(
      switchMap((data) => {
        
        const preguntasConImagen$ = data.questions.map((p: Pregunta) =>
          this.buscarImagenWikipedia(p.correctAnswers).pipe(
            map((imagenUrl) => ({
              ...p,
              imagen: imagenUrl || 'assets/imgs/default.jpg'
            }))
          )
        );

        return forkJoin(preguntasConImagen$).pipe(
          map((preguntasFinales) => ({ questions: preguntasFinales }))
        );
      })
    );
}

private buscarImagenWikipedia(titulo: string): Observable<string | null> {
    const encoded = encodeURIComponent(titulo);
    const url = `https://es.wikipedia.org/api/rest_v1/page/summary/${encoded}`;

    return this.http.get<any>(url).pipe(
      map((data) => data.thumbnail?.source || null),
      
      switchMap((img) => of(img)),
    );
  }
}
