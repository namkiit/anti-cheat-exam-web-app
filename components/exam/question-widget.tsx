import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { examActions } from "../../store/exam-store";
import classes from "./question-widget.module.scss";

interface QuestionWidgetProp { }

const QuestionWidget: React.FC<QuestionWidgetProp> = () => {
  const dispatch = useAppDispatch();
  const activeExam = useAppSelector((state) => state.exam.activeExam);
  const currentQuestion = useAppSelector(
    (state) => state.exam.activeExam.currentQuestion
  );

  if (!activeExam?.exam?.questions) {
    return <p>No Question!</p>;
  }

  const {
    exam: { questions },
    answerKeys,
  } = activeExam;

  const question = questions[currentQuestion];

  const onAnswerChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    val: string
  ) => {
    const isCorrect = val === question.correctAnswer;

    dispatch(
      examActions.setAnswer({
        questionNo: currentQuestion,
        answerKey: val,
        questionId: question._id,
        isCorrect,
      })
    );
  };

  return (
    <div className={classes.questionWidget}>
      <Typography
        className={classes.question}
        sx={{
          marginBottom: "2rem",
        }}
      >
        {`${currentQuestion + 1}. ${question.title}`}
      </Typography>

      <div className={classes.optionsGroup}>
        <FormControl>
          <RadioGroup
            value={answerKeys[currentQuestion].answer}
            onChange={onAnswerChange}
          >
            {question.answers.map(({ text, label }) => {
              return (
                <FormControlLabel
                  key={label}
                  value={label}
                  control={<Radio />}
                  label={text}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default QuestionWidget;
