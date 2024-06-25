import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const ExamRule = ({ onStartExam }) => {
 return (
    <Grid
    container
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{ height: "100vh" }}
  >
    <Grid item xs={1}>
      <h1>
        Quy chế thi:
      </h1>
    </Grid>

    <Grid item xs={8}>
      <Grid
        container
        direction="column"
        height="100%"
        justifyContent="space-between"
      >
        <Grid item xs={2} justifyContent="space-between">
          <h3 style={{ marginBottom: '10px' }}>1. Yêu cầu về thiết bị và camera:</h3>
          - Thí sinh phải bật camera trong suốt quá trình thi. Nếu camera không nhận diện được khuôn mặt thí sinh hoặc có nhiều khuôn mặt xuất hiện trong khung hình, sẽ bị trừ <b>10% điểm tín nhiệm</b> cho mỗi vi phạm.
        </Grid>
        <Grid item xs={2}>
          <h3 style={{ marginBottom: '10px' }}>2. Chế độ toàn màn hình:</h3>
          - Thí sinh bắt buộc phải làm bài trong chế độ toàn màn hình. Nếu thí sinh thoát khỏi chế độ toàn màn hình, sẽ bị trừ <b>20% điểm tín nhiệm</b>.
        </Grid>
        <Grid item xs={2}>
          <h3 style={{ marginBottom: '10px' }}>3. Chuyển đổi cửa sổ làm bài:</h3>
          - Thí sinh không được chuyển đổi tiêu điểm sang cửa sổ khác trong suốt quá trình thi. Mỗi lần phát hiện chuyển đổi cửa sổ, thí sinh sẽ bị trừ <b>20% điểm tín nhiệm</b>.
        </Grid>
        <Grid item xs={2}>
          <h3 style={{ marginBottom: '10px' }}>4. Hành vi trong quá trình thi:</h3>
          - Thí sinh phải tập trung làm bài, không được liên tục nhìn trái hoặc phải trong 15 giây. Nếu vi phạm, thí sinh sẽ bị trừ <b>5% điểm tín nhiệm</b>.
        </Grid>
        <Grid item xs={2}>
          <h3 style={{ marginBottom: '10px' }}>5. Các quy định khác:</h3>
          - Trong suốt quá trình thi, thí sinh không được phép nhờ sự trợ giúp từ người khác.
           <br />
          - Nếu phát hiện bất kỳ hành vi gian lận nào, thí sinh sẽ bị xử lý theo quy định của nhà trường.
        </Grid>
        <Grid item xs={2}>
          <b>Lưu ý:</b> Việc trừ điểm tín nhiệm có thể dẫn đến kết quả thi của thí sinh không được công nhận. Thí sinh cần tuân thủ nghiêm ngặt các quy định trên để đảm bảo tính công bằng và chính xác của kỳ thi.
        </Grid>
      </Grid>
    </Grid>

    <Grid item xs={1}>
      <Button variant="contained" color="primary" onClick={onStartExam}>
        Bắt đầu bài thi
      </Button>
    </Grid>
  </Grid>
 )   
}

export default ExamRule;