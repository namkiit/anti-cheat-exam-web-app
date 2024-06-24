import { Container, Grid } from "@mui/material";
import { useAppSelector } from "../../hooks";
import ExamCard from "./exam-card";
import classes from "./dashboard.module.scss";
import { useSession } from "next-auth/react";
import { LoadingBarRef } from "react-top-loading-bar";

interface DashboardProps {
  loadingBarRef: React.RefObject<LoadingBarRef>;
}

const Dashboard: React.FC<DashboardProps> = ({ loadingBarRef }) => {
  const assignedExams = useAppSelector((state) => state.exam.assignedExams);

  const session = useSession();

  return (
    <Container maxWidth="md" className={classes.container}>
      <h1 className={classes.title}>Xin chào {session.data?.user?.fname} !</h1>

      <Grid container direction="column" spacing={4}>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>{assignedExams.length === 0 ? "Bạn không có bài kiểm tra nào được giao !" : "Bạn còn những bài kiểm tra sau cần hoàn thành: "}</div>

        {assignedExams.map((exam) => (
          <Grid key={exam._id} item>
            <ExamCard exam={exam} loadingBarRef={loadingBarRef} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
