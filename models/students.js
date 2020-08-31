const mongoose=require('mongoose')
const Scheme=mongoose.Schema;

const studentSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password1:{
        type:String,
        required:true
    },
    password2:{
        type:String,
        required:true
    }

})

var students=mongoose.model('student',studentSchema)
module.exports=students;