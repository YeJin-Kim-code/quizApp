//회원가입
router.post('/signup', async(req, res)=>{//사용자가 /auth/sighup 경로로 요청을 보내면 실행
    const{username, password} = req.body;

try{
    const user = new User({username, password});//유저이름 패스워드 받아 새 사용자로 저장
    await user.save();
    res.status(201).send('User registered successfully');
} catch (error){
    res.status(400).send('Error registering user: ' + error.message);
}
});

//로그인
router.post('/login', async(req, res)=>{//login 경로로 오는 POST요청을 처리
    //async - js에서 비동기 프로그래밍을 더 쉽게 처리할 수 있도록 도와주는 기능
    const {username, password} = req.body;//클라이언트가 보낸 요청의 데이터를 담음

    try{
        const user = await User.findOne({username});//데이터베이스에서 사용자 찾기
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).send('Invalid username or password');
        }
        const token = jwt.sign({id:user._id}, JWT_SECRET,{expiresIn:'1h'});
        //비밀번호가 맞으면 json web token을 생성
        res.json({token});//json 형식으로 토큰 반환
    } catch(error) {
        res.status(500).send('Error logging in: ' + error.message);
    }
});