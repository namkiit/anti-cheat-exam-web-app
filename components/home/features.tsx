import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
} from "@mui/material";
import React from "react";
import classes from "./home.module.scss";
import Image from "next/image";

interface FeaturesProps {}

const featureList = [
  {
    icon: "ai_icon.png",
    title: "Phát hiện khuôn mặt bằng AI",
    content:
      "Phát hiện gian lận bằng cách theo dõi các cử động khuôn mặt của học viên",
  },
  {
    icon: "cross_icon.svg",
    title: "Phát hiện việc chuyển tab",
    content: "Phát hiện người dùng chuyển tab trong thời gian làm bài",
    padding: "0px",
  },
  {
    icon: "assesment_icon.svg",
    title: "Đánh giá và Kiểm tra",
    content: "Hỗ trợ đánh giá và kiểm tra tức thời",
    padding: "0px",
  },
  // {
  //   icon: "video_icon.svg",
  //   color: "#DD7F6B",
  //   title: "Video Proctoring",
  //   content: "Support for live video proctoring (future support)",
  // },
  // {
  //   icon: "comm_icon.svg",
  //   title: "Live Communication",
  //   content:
  //     "Live real time communication between user and proctor (future support)",
  //   padding: "12px",
  //   color: "midnightblue",
  // },
];

const Features: React.FC<FeaturesProps> = () => {
  return (
    <section className={classes.featureSection}>
      <Container>
        <h1>Tính năng</h1>

        <Grid
          container
          rowSpacing={5}
          columnSpacing={5}
          justifyContent="center"
        >
          {featureList.map((feature, i) => {
            return (
              <Grid item key={i}>
                <Card
                  sx={{
                    maxWidth: "320px",
                    backgroundColor: "white",
                    borderRadius: "0.85rem",
                    boxShadow: "0 5px 25px rgb(0 0 0 / 8%)",
                    padding: "1rem",
                    height: "100%",
                    textAlign: "center",
                    display: "flex", 
                    flexDirection: "column"
                  }}
                >
                  <CardMedia>
                    <Avatar
                      sx={{
                        height: "60px",
                        width: "60px",
                        padding: feature.padding ?? "4px",
                        backgroundColor: "#fff",
                        margin: "0 auto",
                      }}
                    >
                      <Image
                        src={`/images/icon/${feature.icon}`}
                        height="64px"
                        width="64px"
                        alt="icon"
                      />
                    </Avatar>
                  </CardMedia>

                  <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around", flexGrow: 1 }}>
                    <h3>{feature.title}</h3>
                    <p>{feature.content}</p>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </section>
  );
};

export default Features;
