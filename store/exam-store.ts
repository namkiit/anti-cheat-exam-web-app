import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnsweredQuestion, AssignedExam, SubmittedExam, Exam } from "../models/exam-models";

export interface ExamStore {
  activeExam: {
    exam: Exam;
    currentQuestion: number;
    credibilityScore: number;
    didLeaveExam?: boolean;
    answerKeys: AnsweredQuestion[];
    score: number;
    expiresIn: number;
  };
  assignedExams: AssignedExam[];
  submittedExams: SubmittedExam[];
}

const initialState: ExamStore = {
  activeExam: null,
  assignedExams: [],
  submittedExams: [],
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    setActiveExam: (state: ExamStore, action: PayloadAction<Exam>) => {
      const activeExam: ExamStore["activeExam"] = {
        exam: action.payload,
        currentQuestion: 0,
        credibilityScore: 100,
        didLeaveExam: false,
        answerKeys: Array(action.payload.questionCount).fill({
          questionId: "",
          answer: "",
          isCorrect: false,
        }),
        score: 0,
        expiresIn: new Date().getSeconds() + action.payload.duration,
      };

      state.activeExam = activeExam;
    },

    clearActiveExam: (state: ExamStore) => {
      state.activeExam = null;
    },

    goToQuestion: (state: ExamStore, action: PayloadAction<number>) => {
      if (!state.activeExam) return;
      const questionNo = action.payload;

      if (questionNo < 0 || questionNo >= state.activeExam.exam.questionCount) {
        return;
      }

      state.activeExam.currentQuestion = questionNo;
    },

    nextQuestion: (state: ExamStore) => {
      if (!state.activeExam) return;
      const { exam, currentQuestion } = state.activeExam;

      if (currentQuestion + 1 === exam.questionCount) {
        return;
      }

      state.activeExam.currentQuestion += 1;
    },

    prevQuestion: (state: ExamStore) => {
      if (!state.activeExam) return;
      const { exam, currentQuestion } = state.activeExam;

      if (currentQuestion - 1 < 0) {
        return;
      }

      state.activeExam.currentQuestion -= 1;
    },

    setAnswer: (
      state: ExamStore,
      action: PayloadAction<{ questionNo: number; answerKey: string; questionId: string; isCorrect: boolean }>
    ) => {
      if (!state.activeExam) return;
      const { questionNo, answerKey, questionId, isCorrect } = action.payload;

      if (questionNo < 0 || questionNo >= state.activeExam.exam.questionCount) {
        return;
      }

      state.activeExam.answerKeys[questionNo].answer = answerKey;
      state.activeExam.answerKeys[questionNo].questionId = questionId;
      state.activeExam.answerKeys[questionNo].isCorrect = isCorrect;

      // Recalculate score
      const correctAnswers = state.activeExam.answerKeys.filter(
        (answer) => answer.isCorrect
      ).length;
      state.activeExam.score = (10 / state.activeExam.exam.questionCount) * correctAnswers;
    },

    setAssignedExams: (
      state: ExamStore,
      action: PayloadAction<AssignedExam[]>
    ) => {
      state.assignedExams = action.payload;
    },

    clearAssignedExams: (state: ExamStore) => {
      state.assignedExams = [];
    },

    setSubmittedExams: (
      state: ExamStore,
      action: PayloadAction<SubmittedExam[]>
    ) => {
      state.submittedExams = action.payload;
    },

    decreaseCredibilityScore: (state: ExamStore, action: PayloadAction<number>) => {
      if (!state.activeExam) return;
      const newScore = state.activeExam.credibilityScore - action.payload;
      state.activeExam.credibilityScore = newScore < 0 ? 0 : newScore;
    },
  },
});

const examActions = examSlice.actions;

export default examSlice;
export { examActions };
