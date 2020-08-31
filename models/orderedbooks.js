const mongoose=require('mongoose')
const Scheme=mongoose.Schema;



const orderbookSchema=new mongoose.Schema({
    username:{
        type:String
    },
    address:{
        type:String
    },
    email:{
        type:String
    },
    bookOrdered:[{bookID:{
        type:String
    },
    time:{
        type:Date,
        default:Date.now()
    }}]
    
})

var orderbooksdata=mongoose.model('orderbookdata',bookSchema)
module.exports=orderbooksdata;