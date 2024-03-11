import React from "react";
import classes from "./home.module.scss";
import { Button, Container, Stack } from "@mui/material";
import Image from "next/image";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import LoginIcon from "@mui/icons-material/Login";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { LoadingBarRef } from "react-top-loading-bar";

interface HeroProps {
  loadingBarRef: React.RefObject<LoadingBarRef>;
}

const Hero: React.FC<HeroProps> = ({ loadingBarRef }) => {
  const session = useSession();

  const showLoadingWidget = () => {
    loadingBarRef.current.continuousStart(50);
  };

  return (
    <React.Fragment>
      <section className={classes.heroSection}>
        <Container>
          <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="start"
          >
            <div className={classes.heroText}>
              <h1>Giải pháp hoàn toàn mới cho thi online</h1>

              <p>
                Phát hiện gian lận trong bài kiểm tra online với Trí tuệ nhân tạo & Học máy
              </p>

              <Stack direction="row" className={classes.buttonGroup}>
                {session.status === "authenticated" ? (
                  <Link href="/dashboard">
                    <Button
                      startIcon={<ArrowOutwardIcon />}
                      variant="contained"
                      size="large"
                      color="primary"
                      onClick={showLoadingWidget}
                    >
                      Bài thi của tôi
                    </Button>
                  </Link>
                ) : (
                  <Link href="/auth/login">
                    <Button
                      startIcon={<LoginIcon />}
                      variant="contained"
                      size="large"
                      color="primary"
                      disabled={session.status === "loading"}
                      onClick={showLoadingWidget}
                    >
                      Đăng nhập
                    </Button>
                  </Link>
                )}
              </Stack>
            </div>

            <div className={classes.phone}>
              <Image
                src="/images/hero_img.png"
                width="400px"
                height="600px"
                alt="Hero Image"
                objectFit="cover"
              />
            </div>
          </Stack>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Hero;
