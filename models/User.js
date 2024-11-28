const mongoose = require('mongoose');
const bcrypt = require('bcrypt');//비밀번호를 암호화하는 라이브러리

const userSchema = new mongoose.Schema({
    username: {type:String, required:true, unique: true},//문자열 필수 유일
    password: {type: String, required: true},//문자열 필수
});

userSchema.pre('save', async function (next)//pre-데이터가 데이터베이스에 저장되기 직전에 특정작업을 수행
{
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);//비밀번호를 암호화하는 함수
    next();
});

userSchema.methods.comparePassword = funcion(candidatePassword){
    return bcrypt.compare(candidatePassword, this.password);
}; //사용자가 입력한 비밀번호와 암호화된 비밀번호를 비교