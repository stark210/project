const express = require('express')
const moongoose = require('mongoose')
const books= require('../models/books.js')
const bodyParser = require('body-parser');
const bookcart=require('../models/cart.js')
var multer=require('multer')
var path=require('path')
const router = express.Router();

router.use(bodyParser.json());

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/',(req,res)=>{

    bookcart.find({username:req.query.username})
    .then((books)=>{
        
        res.render('bookcart',{books:books,data:req.query.username,msg:req.query.msg})
    })
})

router.post('/added',urlencodedParser,(req,res)=>{
    console.log(req.query.username)
    console.log(req.query.bookID)
    console.log(req.query.stock)
    if(req.query.stock>0)
    {
        bookcart.create({
            username:req.query.username,
            bookID:req.query.bookID,
            image:req.query.image,
            subject:req.query.subject,
            bookTopic:req.query.topic
        })
        .then(()=>{
            res.redirect('/booksite?bookID='+req.query.bookID+'&username='+req.query.username+'&msg=Added to cart successfully')
        })
    }
    else
    {   
        res.redirect('/booksite?bookID='+req.query.bookID+'&username='+req.query.username+'&msg1=Out of Stock')
    }
})


//placing an order
router.get('/order',(req,res)=>{
    bookcart.find({username:req.query.username})
    .then((bookes)=>{
      bookes.forEach((book)=>{
        books.findById({_id:book.bookID})
        .then((beek)=>{
            var st=beek.stock-1;
            beek.update({stock:st})
            .then((success)=>{
                console.log('success')

            })
        })
      })
    })
    res.redirect('/cart?username='+req.query.username+'&msg=Your order has been successfully placed with delivery fees of 50rs further details will be emailed')
})
module.exports = router;











