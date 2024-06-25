export interface Question {
  _id: string;
  title: string;
  answers: any;
  correctAnswer: string;
}

export interface Exam {
  questions: Question[];
  questionCount: number;
  _id: string;
  name: string;
  startDate: string;
  endData: string;
  duration: number;
}

export interface AssignedExam {
  _id: string;
  questionCount: number;
  name: string;
  startDate: string;
  endDate: string;
  duration: number;
  status: string;
}

export interface SubmittedExam {
  examId: string;
  questionCount: number;
  title: string;
  startDate: string;
  endDate: string;
  duration: number;
  score: number;
  credibilityScore: number;
}

export interface AnsweredQuestion { 
  questionId: string;
  answer: string;
  isCorrect: boolean;
}
