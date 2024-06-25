import {
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { SubmittedExam } from "../../models/exam-models";
import classes from "../dashboard/exam-card.module.scss";
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import TimelapseIcon from "@mui/icons-material/Timelapse";
import DateRangeIcon from "@mui/icons-material/DateRange";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ScoreboardOutlinedIcon from '@mui/icons-material/ScoreboardOutlined';
import { Stack } from "@mui/system";
import { LoadingBarRef } from "react-top-loading-bar";

// TODO: Disable button for past or future exam

interface ExamCardProps {
  exam: SubmittedExam;
  loadingBarRef: React.RefObject<LoadingBarRef>;
}

const ExamCard: React.FC<ExamCardProps> = ({ exam, loadingBarRef }) => {
  const startDate = new Date(exam.startDate);
  const endDate = new Date(exam.endDate);

  const moment = require('moment');
  require('moment/locale/vi');
  moment.locale('vi', {
    meridiem: function (hour, minute, isLowercase) {
      if (hour < 12) {
        return 'AM'; // Sáng
      } else {
        return 'PM'; // Chiều
      }
    }
  });

  const startDateFormatted = moment(startDate).format("lll A");
  const endDateFormatted = moment(endDate).format("lll A");
  const duration = moment.duration(exam.duration, "seconds").as("minutes");

  return (
    <div>
      <Card
        sx={{
          boxShadow: "none",
          outline: "solid #eeeeee 2px",
        }}
      >
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              sx={{ fontSize: 14, marginBottom: "12px" }}
              color="text.secondary"
              gutterBottom
            >
              {exam?.title}
            </Typography>

            <Typography
              sx={{ fontSize: 14, marginBottom: "12px" }}
              color="text.secondary"
              gutterBottom
            >
              ID: {exam?.examId}
            </Typography>
          </Stack>

          <Divider />

          <List>
            <ListItem>
              <ListItemIcon>
                <DateRangeIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
              >
                <span className={classes.examDateSpan}>
                  {startDateFormatted}
                </span>
                <span className={classes.examDateSpan}>
                  {/* <ArrowForwardIcon /> */}→
                </span>
                <span className={classes.examDateSpan}>{endDateFormatted}</span>
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <TimelapseIcon />
              </ListItemIcon>
              <ListItemText
                primary={`${duration} Phút`}
                primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
              />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <FormatListNumberedIcon />
              </ListItemIcon>
              <ListItemText
                primary={`${exam.questionCount} Câu hỏi`}
                primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
              />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <ScoreboardOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary={`Điểm làm bài: ${exam.score}`}
                primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
              />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <CreditScoreIcon />
              </ListItemIcon>
              <ListItemText
                primary={`Điểm uy tín: ${exam.credibilityScore} %`}
                primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamCard;
