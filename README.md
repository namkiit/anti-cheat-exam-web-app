# Auto-Proctoring Exam Web Application 🌟

A platform that aims to stop cheating in online exams with the power of AI and ML.
  
This is the my upgraded version of Prathamesh Mutkure's [Anti-Cheat Exam Web App](https://github.com/prathamesh-mutkure/anti-cheat-app-web) with new features:

- Randomize Questions & Answers Order
- Disable Copy Paste, Print Screen and Open DevTools Hotkeys
- DevTools Detection & Protection
- Content Management System for Managing Exams, Questions & Students
- Credibility Score System & View Exam Results

<p  align="center">

<img  src="https://user-images.githubusercontent.com/28570857/178106216-25d91b1c-06cf-42fa-85fc-cf3540868b1f.png"/>

</p>

- <a href="auto-proctoring-exam-web-app.vercel.app/" target="_blank">Demo</a>

- [Features and Interfaces](#features)
  - [Home](#home)
  - [Login and Authentication](#auth)
  - [Dashboard](#dashboard)
  - [Exam](#exam)
  - [Face Detection](#face)

- [Tech Stack](#tech-stack)
- [Important Notes](#imp-points)
- [Getting Started](#instructions)
- [Useful Links](#links)
- [Credit](#credit)
- [Contact](#contact)

  
  
  
  <a id="features"> </a>

## Features and Interfaces

1. Home Page   <a id="home"> </a>

   - [Landing Page](https://anti-cheat-exam-app.vercel.app/) which lists all the features of the app
  
   <img width="1835" alt="Screenshot 2022-11-13 at 4 36 11 PM" src="https://user-images.githubusercontent.com/28570857/201518806-155ea557-79cd-4c81-948a-af9575cbff57.png">

   <img width="1835" alt="Screenshot 2022-11-13 at 6 04 36 PM" src="https://user-images.githubusercontent.com/28570857/201521938-de2f9979-7490-471e-b6be-0642f982b700.png">

 
 2.  Login Page (Authentication)  <a id="auth"> </a>
 
     - Fast and secure authentication 
     - JWT tokens used to persist the authentication state

     <img width="1835" alt="Screenshot 2022-11-13 at 4 35 42 PM" src="https://user-images.githubusercontent.com/28570857/201518738-83d0e340-9394-42c5-b0fe-6770eea2009d.png">
  

3. Dashboard <a id="dashboard"> </a>

	- Shows bried information about all the exams assigned to the user

	- The user can start an exam only at the correct timeslot

   - If there are no exams available, you can go to the [CMS website](https://auto-proctoring-exam-cms.vercel.app/) to create a new one

    <img width="1835" alt="Screenshot 2022-11-13 at 4 37 01 PM" src="https://user-images.githubusercontent.com/28570857/201518882-8cdf77fb-25a1-4427-b3d5-d015d47a8829.png">

  
  
4. Exam Page <a id="exam"> </a>

   - Simple and minimalistic exam page where the user can answer MCQ-based questions

   - The user can view and track their progress
  

   <img width="1835" alt="Screenshot 2022-11-13 at 5 59 55 PM" src="https://user-images.githubusercontent.com/28570857/201521732-02537090-8757-451a-9d31-49df9bd6aad3.png">

   <img width="1801" alt="Screenshot 2022-11-13 at 6 19 48 PM" src="https://user-images.githubusercontent.com/28570857/201522628-e2007a34-fe57-44cf-bc45-a6a17963ed4c.png">

  
  
5. AI-powered face motion detector <a id="face"> </a>

   - I've used Google's Mediapipe library to track the motion of the user's face

   - This app can check if a user is trying to cheat by monitoring the co-ordinates of their face

   - The face detection is performed on client without sending anything to the server

   - Thus, Face detection is fast and real-time

      https://user-images.githubusercontent.com/28570857/205257552-5aa0235b-ddee-463a-b746-2ecc06ba8c4f.mp4

  
<a id="tech-stack"> </a>

## Tech stack

- Next.js (React)

- TypeScript

- Redux

- Axios

- Google Mediapipe

- NextAuth with JWT
  

<a id="imp-points"> </a>

## Important Notes
  

1. First setup the backend by following the instructions in this [repository](https://github.com/namkiit/auto-proctoring-exam-backend)

2. Use ID '20198235' and password 'namkiet3010' to login or you can create a new student account at [CMS website](https://auto-proctoring-exam-cms.vercel.app/)

6. Allow **permissions** for camera and mic when asked

7. Make sure the `BACKEND_URL` is appended with `/api`

  

<a id="instructions"> </a>

## Getting Started

  
1. Clone the project

   -  `https://github.com/namkiit/auto-proctoring-exam-web-app.git`

2. Install all the packages

   -  `npm install`

3. Create a `.env` file and set the following variables or as shown in the `.env.example` file

   -  `NEXT_PUBLIC_BACKEND_URL`

   -  `NEXTAUTH_SECRET`

   -  `NEXTAUTH_URL` (must be identical to the url of the app)

4. Run the app

   -  `npm run dev`

5. Open `http://localhost:3000` with your browser to see the app
  
 
<a id="links"> </a>

## Useful Links

  
- [Project Demo](https://auto-proctoring-exam-web-app.vercel.app/)

- [Backend Repository](https://github.com/namkiit/auto-proctoring-exam-backend)

- [CMS Repository](https://github.com/namkiit/auto-proctoring-exam-cms)

- [Graduation Thesis](https://drive.google.com/file/d/1r_Z7Hc37IHGS2bzHMFtg4zdbIWAKXn2r/view?usp=sharing) 

- [Graduation Thesis Slide](https://drive.google.com/file/d/1vYN8kDhpNvohFwgcBNSJjLLROTrJoGKz/view?usp=sharing)


<a id="credit"> </a>

## Credit

Base project belongs to Prathamesh Mutkure. You can know more about him at [Twitter](https://twitter.com/prathamesh_io/) or [prathamesh.co](https://prathamesh.co)

<a id="contact"> </a>

## Contact

[![Facebook](https://img.shields.io/badge/Facebook-follow-blue.svg?logo=twitter&logoColor=white)](https://www.facebook.com/kiet.nam.56/) [![Instagram](https://img.shields.io/badge/Instagram-follow-purple.svg?logo=instagram&logoColor=white)](https://www.instagram.com/namkiit/)