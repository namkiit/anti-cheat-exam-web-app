import { BASE_URL } from "../../constants";
import { AnsweredQuestion } from "../../models/exam-models";

const getUser = async (id: string, password: string) => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ id, password }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok || data.err) {
      throw new Error(data.err || "Failed to signin user!");
    }

    return {
      id: data?.id,
      fname: data?.fname,
      lname: data?.lname,
      token: data?.token,
    };
  } catch (e) {
    throw new Error(e.message || "Failed to signin user!");
  }
};

const submitExam = async (
  studentId: string,
  examId: string,
  answers: AnsweredQuestion[],
  score: number,
  credibilityScore: number,
  token: string
) => {
  try {
    const res = await fetch(`${BASE_URL}/submitExam/${studentId}`, {
      method: "POST",
      body: JSON.stringify({ examId, answers, score, credibilityScore }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok || data.err) {
      throw new Error(data.err || "Failed to submit exam!");
    }

    return data;
  } catch (e) {
    throw e;
  }
};

export { getUser, submitExam };
