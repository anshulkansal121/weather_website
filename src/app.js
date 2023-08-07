const path = require('path') 
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//setup handlebars using hbs and views location
app.set('view engine','hbs')
app.set('views',path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))

//setup static director to serve
app.use(express.static(path.join(__dirname,'../public')))

app.get('/',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Anshul'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        name: 'Anshul',
        age: 22,
        message: 'Hello from the app.js'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        name: 'Anshul',
        title: 'About'
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }
    geocode(req.query.address, (error, {latitude,longitude,location} = {})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(res.query.search)
    res.send({
        products: []
    })
})

//for all the other page request will get 404 page
app.get('*',(req,res)=>{
    res.render('error',{
        message: '404 Page Not found!',
        name: 'Anshul Kansal'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})