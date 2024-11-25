const express = require('express'); //express는 node.js에서 많이 쓰이는 웹 프레임워크
const mongoose = require('./config/db');//데이터베이스와 연결
const bodyParser = require('body-parser');//클라이언트에서 보낸 데이터를 쉽게 다룰 수 있도록 도와주는 라이브러리

const authRoutes = require('./routes/auth');//회원가입, 로그인 관련 라우트
const quizRoutes = require('./routes/quiz');//퀴즈 관련 라우트

app.use('/quth', authRoutes);
app.use('/quiz', quizRoutes);

app.listen(PORT, ()=> console.log('Server running on port ${PORT}'));//서버를 특정 포트에서 실행하고, 성공적으로 시작되었음을 콘솔에 표시
