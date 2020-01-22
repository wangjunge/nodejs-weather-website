const request = require('request')

const forcast = (latitude, longitude, callback) =>{
    const url = "https://api.darksky.net/forecast/2349dddca82789886f35860b439c859f/" + latitude + "," + longitude

    request({url: url,json: true}, (error,response) => {
        // if( error ) {
        //     callback('Unable to connect to weather service!',undefined)
        // } else if ( response.body.error ) {
        //     callback('No data available!',undefined)
        // } else {
        //     console.log(response.body.currently)

        //     // const data = JSON.parse(response.body)
        //     //console.log(data.currently)
             callback(error,response)
        // }
    })
}



module.exports = forcast