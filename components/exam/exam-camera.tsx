import { Camera } from "@mediapipe/camera_utils";
import { FaceDetection, Results } from "@mediapipe/face_detection";
import { Button } from "@mui/material";
import NextImage from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Webcam from "react-webcam";
import {
  b64toBlob,
  detectCheating,
  extractFaceCoordinates,
  getCheatingStatus,
  printLandmarks,
} from "../../helpers/face-detection/face-detection-helper";
import classes from "./exam-camera.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { FLAGGED_ACTIONS_SCORE } from "../../constants";
import { examActions } from "../../store/exam-store";

interface ExamCameraProps { 
  handleCheatingLimit: Function;
}

const ExamCamera: React.FC<ExamCameraProps> = ({ handleCheatingLimit }) => {
  const [img_, setImg_] = useState<string>();
  const webcamRef: React.LegacyRef<Webcam> = useRef();
  const faceDetectionRef = useRef<FaceDetection>(null);
  const realtimeDetection = true;

  const dispatch = useAppDispatch();

  const frameRefresh = 30;
  let currentFrame = useRef(0);

  const [chetingStatus, setChetingStatus] = useState("");
  // const [isWarningToastOn, setIsWarningToastOn] = useState(false);

  const [count, setCount] = useState(0);

  useEffect(() => {
    let intervalId: any;

    // Reset the count if chetingStatus is "Không phát hiện bất thường"
    if (chetingStatus === "Không phát hiện bất thường") {
      setCount(0);
    } else {
      // Set up an interval to increment the count every second
      intervalId = setInterval(() => {
        setCount((prevCount) => prevCount + 1);

        // Check if the count reaches 15 and decrease credibility score if true
        if (count === 15) {
          toast("Bạn đã không nhìn vào camera hơn 15s, hệ thống giờ sẽ trừ điểm tin cậy !");
          dispatch(examActions.decreaseCredibilityScore(FLAGGED_ACTIONS_SCORE.NOT_LOOKING_IN_CAMERA));
          // handleCheatingLimit();
          clearInterval(intervalId);
        }
      }, 1000);
    }

    // Clean up the interval when the component unmounts or when chetingStatus changes
    return () => clearInterval(intervalId);
  }, [chetingStatus, count]);


  useEffect(() => {
    const faceDetection: FaceDetection = new FaceDetection({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`;
      },
    });

    faceDetection.setOptions({
      minDetectionConfidence: 0.5,
      model: "short",
    });

    function onResult(result: Results) {
      // Check if the toast is already displayed
      const existingToast = toast.isActive('faceDetectionToast');

      if (result.detections.length < 1) {
        // Display toast if not already displayed
        if (!existingToast) {
          toast.info(
            "Không tìm thấy khuôn mặt, hãy đảm bảo rằng mặt của bạn ở trong vùng camera và không bị che lấp !",
            {
              toastId: 'faceDetectionToast', // Set a unique toastId
              autoClose: false, // Disable autoClose
            }
          );
        }
        return;
      } else if (result.detections.length > 1) {
        // Display toast if not already displayed
        if (!existingToast) {
          toast.warn(
            "Phát hiện nhiều người trong khung hình, bạn có thể bị đánh dấu bài !",
            {
              toastId: 'faceDetectionToast', // Set a unique toastId
              autoClose: false, // Disable autoClose
            }
          );
        }
        return;
      } else if (result.detections.length === 1) {
        // Hide the toast if it's displayed
        if (existingToast) {
          toast.dismiss('faceDetectionToast');
        }
      }

      const faceCoordinates = extractFaceCoordinates(result);

      // printLandmarks(result);

      const [lookingLeft, lookingRight] = detectCheating(
        faceCoordinates,
        false
      );

      const cheatingStatus = getCheatingStatus(lookingLeft, lookingRight);
      setChetingStatus(cheatingStatus);
    }

    faceDetection.onResults(onResult);
    faceDetectionRef.current = faceDetection;

    if (webcamRef.current) {
      const camera = new Camera(webcamRef.current.video, {
        onFrame: async () => {
          // Proceed frames only if real time detection is on
          if (!realtimeDetection) {
            return;
          }

          currentFrame.current += 1;

          if (currentFrame.current >= frameRefresh) {
            currentFrame.current = 0;
            await faceDetection.send({ image: webcamRef.current.video });
          }
        },
        width: 1280,
        height: 720,
      });

      camera.start();
    }

    return () => {
      faceDetection.close();
    };
  }, [webcamRef, realtimeDetection]);

  const onResultClick = async () => {
    // const imgSrc = webcamRef.current.getScreenshot();
    // const blob = await b64toBlob(imgSrc);
    // const img = new Image(600, 400);
    // const src = URL.createObjectURL(blob);
    // img.src = src;
    // setImg_(src);

    await faceDetectionRef?.current?.send({ image: webcamRef.current.video });
  };

  return (
    <div className={classes.cameraContainer}>
      <p className={classes.cheatingStatus}>Trạng thái gian lận: {chetingStatus}</p>

      {true && (
        <Webcam
          className={classes.camera}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
      )}

      <br />

      {/* <Button onClick={onResultClick}>Get Result</Button> */}

      {img_ && <NextImage src={img_} alt="Profile" />}
    </div>
  );
};

export default ExamCamera;
