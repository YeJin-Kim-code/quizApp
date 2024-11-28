const mongoose = require('mongoose');//mongoDB와 연결할 수 있도록 돕는 라이브러리

mongoose.connect('mongodb://localhost:27017/quizapp',{
    useNewUrlParser: true,//mongoDB 연결 방식 설정
    useUnifiedTopology:true,
})

const db = mongoose.connection;//데이터베이스 연결 객체를 가져옵니다.

db.on('error', console.error.bind(console, 'Connection error:'));

db.once('open',()=>console.log('Connected to MongoDB'));