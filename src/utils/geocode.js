const request = require('request')

const geocode = (address, callback) => {
    //const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
 encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoianVuZXc4IiwiYSI6ImNrNWhqMnA5bDA0ZXEzcGxpcGN0OXRvbWYifQ.F5EPYAhWpDLKG3kDniFy6Q&limit=1'
    request({url: url, json: true}, (error,response) => {
        console.log('Response', response)

        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (!response.body.features || response.body.features.length === 0) {
            callback('Unable to find location, Try another search',undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode