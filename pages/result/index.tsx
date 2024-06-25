import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useRef } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import Dashboard from "../../components/result/dashboard";
import NavBarDashboard from "../../components/dashboard/navbar-dashboard";
import { getSubmittedExams } from "../../helpers/api/exam-api";
import { useAppDispatch } from "../../hooks";
import { SubmittedExam } from "../../models/exam-models";
import { examActions } from "../../store/exam-store";

interface ResultPageProps {
  exams: SubmittedExam[];
  error: string;
}

const ResultPage: React.FC<ResultPageProps> = ({ exams, error }) => {
  const dispatch = useAppDispatch();
  const loadingBarRef: React.Ref<LoadingBarRef> = useRef(null);

  useEffect(() => {
    if (!exams) {
      return;
    }

    dispatch(examActions.setSubmittedExams(exams));
  }, [dispatch, exams]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Head>
        <title>Your Exam Results</title>
      </Head>
      <LoadingBar color="#ffffff" ref={loadingBarRef} />
      <NavBarDashboard loadingBarRef={loadingBarRef} />
      <Dashboard loadingBarRef={loadingBarRef} />
    </div>
  );
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  try {
    const submittedExams: SubmittedExam[] = await getSubmittedExams(
      session.user.id,
      session.user.token
    );

    if (!submittedExams && submittedExams.length === 0) {
      throw new Error("Error getting submitted exams!");
    }

    return {
      props: {
        exams: submittedExams,
        error: null,
      },
    };
  } catch (e) {
    return {
      props: {
        exams: null,
        error: e.message ?? "Error getting submitted exams!",
      },
    };
  }
};

export default ResultPage;
export { getServerSideProps };
