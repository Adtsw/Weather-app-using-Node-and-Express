const path = require('path')
const express = require('express')
//const exphbs  = require('express-handlebars');
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')


const helpHtml = path.join(__dirname, '../public')
const indexPath = path.join(__dirname, '../templates/views')
const headerPath = path.join(__dirname, '../templates/partials')
const app = express()

// app.engine('hbs', exphbs({
//     layoutsDir: `${__dirname}/views`
// }))

//set up handlebars
app.set('view engine', 'hbs')
app.set('views', indexPath)
//console.log(express.static(helpHtml))

hbs.registerPartials(headerPath)

//To get static html file
app.use(express.static(helpHtml))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Aditya Shaw'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        name: 'Aditya Shaw'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Aditya Shaw'
    })
})

app.get('/weather', (req, res) => {
    let address = req.query.address;
    if(!address){
        return res.send({
            error: 'ENTER AN ADDRESS'
        })
    }
    geocode(address, (error, {latitude, longitude}= {}) => {
     
        if(error){
            return res.send({error})
        }
        // console.log('Error : ' ,error)
        // console.log('DATA : ', data)
    
        forecast(latitude,longitude, (error, data) => {
    
            if(error){
                return res.send({error})
            }
            //console.log('Data', data)
                res.send(data)
           
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Page not found'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '405',
        errorMsg: 'Help article not found'
    })
})

app.listen(3000, () => {
    console.log('This is Express')
})