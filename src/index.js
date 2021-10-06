const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./practise/forecast.js');
const geo = require('./practise/geocode.js');

const app = express();

const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

app.get('', (req, res) => {
    res.render('index', {
        title: "My website",
        name: "Shivarevanth Reddy"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Shivarevanth"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Shivarevanth"
    })
})


app.use(express.static(publicPath))

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "you must provide address term"
        })
    }

    geo(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: "Shivarevanth",
        errorMessage: "No help article found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "Shivarevanth",
        errorMessage: "Page not Found"
    })
})

app.listen(4700, () => {
    console.log('Server started successfully in port number 4700');
})

