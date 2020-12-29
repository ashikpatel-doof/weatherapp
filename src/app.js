const express = require("express")
const { rename } = require("fs")
const hbs = require("hbs")
const req =  require('request')
const forecast = require("./utils/forecast.js")
const gc = require("./utils/geocode.js") 


//setting up paths .. 
const path = require('path')
const publiPath = path.join(__dirname, '../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')
 
const PORT = process.env.PORT || 3000
//Setting Up Express...
const app = express()

//for the static Content Delivery..
app.use(express.static(publiPath))


//dynamic Content Delivery .....
//registrations...
app.set('view engine', 'hbs')
app.set('views',viewpath)
hbs.registerPartials(partialPath)



//routes

//dataComing From Dynamic content via this route..
app.get('', (req,res)=>{
    res.render('index',{
        title : "Weather App",
        name : 'Created by Ashik Patel'
    })
})



app.get('/about', (req,res)=>{
    res.render('about',{
        title : "About us",
        name : "Created By Ashik Patel"
    })
})



app.get('/help', (req,res)=>[
    res.render('help',{
        title : "Help Forum",
        // msg : " hello, user We know the problems youre facing, but you can contact us for any help......",
        name : "Created By Ashik Patel"
    })
])




app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error : "No Address is provided"
        })
    }
//getingDataFrom API:
const addressCommand = req.query.address
// console.log("Calling GC")
gc(addressCommand, (e,r)=>{
    if(e){
        console.log("error Finiding .....")
       return   res.send({
        error : e
    })
    // console.log("Calling Forecast")
    }
   
    forecast(r.location, (efr,resp)=>{
        if(efr){
            console.log(efr)
           return res.send({
                error : efr
            })
        }else{
           return res.send (resp)
        }
    })
})

})





app.get("/help/*",(req,res)=>{
    res.render('error',{
        title :"Oops Something Went Wrong",
        error : "There is not such help forum available",
        name : " Ashik Patel"
    })
})
app.get("*",(req,res)=>{
    res.render('error',{
        title : "ooppssss.",
        error : "That's 404 ! Not found buddy !!",
        name : "Ashik Patel"
    })
})

//binding port to server
app.listen(PORT, ()=>{
    console.log("Server IS up AND running")
})