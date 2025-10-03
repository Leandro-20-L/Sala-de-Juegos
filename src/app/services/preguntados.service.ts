import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  const headers = new HttpHeaders({
    'Authorization': this.apiKey
  });

  const url = `${this.apiUrl}?limit=${limit}&page=${page}&category=${categoria}`;
  return this.http.get<{ questions: Pregunta[] }>(url, { headers });
}
}
