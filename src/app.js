const express = require('express')
const path = require('path')

const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(__filename)

const publicDirPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, "../template/views")
const partialsPath = path.join(__dirname, "../template/partials")

//console.log(publicDirPath)

const app = express()

//set handlebars's engine & views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather App From Dynamic Content',
        name: 'Junge Wang'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Junge Wang',
        image: '/images/eric-veiga-CXF_lrsf54E-unsplash.jpg'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Help',
        helpText: 'Weather app help text'
    })
})

const data = {
    name: 'Junge',
    age: 27,
    race: 'Chinese'
}

// app.get('',(req, res) => {
//     res.send('<h1>Hello express!</h1>')
// })

// app.get('/help',(req, res) => {
//     res.send(data)
// })

app.get('/weather',(req, res) => {
    if( !req.query.address ) {
        res.send({
            error: 'You must provide an address'
        })
    } else {

        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if( error ) {
                return res.send({error})
            }

            forecast(latitude,longitude, (error, forecastData) => {
                var result = ''
                console.log(forecastData)
                if( forecastData ) {
                    if( forecastData.body )
                        result = forecastData.body.currently
                    else
                        result = forecastData.features
                } else {
                    result = 'No data found'
                }
                res.send({
                    forecast: forecastData.body,
                    location,
                    address: req.query.address
                })
            })
        })
        // res.send({
        //     forcast: 'It is snowing',
        //     address: req.query.address,
        //     location:'Philadelphia'
        // })
    }
})
//app.com
//app.com/help
//app.com/about

//404 page
app.get('*', (req,res) => {
    res.render('404',{
        title: 'Error',
        errorMessage: 'Page is not found',
        name: 'Junge Wang'
    })
})

app.listen(3000,() => {
    console.log('Server is up on port 3000.')
})