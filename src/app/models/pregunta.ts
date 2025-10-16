export interface Pregunta {
   id: string;
  category: string;
  format: string;
  question?: string;
  correctAnswers: string;
  incorrectAnswers: string[];
  opciones?: string[];
  imagen?: string;
}
