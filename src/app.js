
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express()
//define path for express

const publicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './templets/views')
const partialsPath = path.join(__dirname, './templets/partials')
//setup handlebar engine and views location


app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'Akarsh'
    })
})
app.get('/about', (req, res) => {
    res.render('About', {
        title: 'About me',
        name: 'Akarsh Mishra'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'help',
        name: 'Akarsh Mishra'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an error'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })
    // res.send({
    //     forecast: 'it is snowing',
    //     location: 'rajkot',
    //     address: req.query.address
    // })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Akarsh Mishra',
        errorMessage: 'Help article not found'
    })
})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Akarsh Mishra',
        errorMessage: 'page not found'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

