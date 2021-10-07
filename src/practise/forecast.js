const request = require('request');

const forecast = (lat, long, callback) => {
    const forecastUrl = 'http://api.weatherstack.com/current?access_key=04641bc3ad255c4b3370b0b32636c39a&query='+ lat + ',' + long;
    
    request({url: forecastUrl, json: true}, (error, response) => {
        if(error)
        {
            callback('Unable to connect web services', undefined)
        }
        else if(response.body.error)
        {
            callback('Unable to find the Location', undefined)
        }
        else{
            callback(undefined,"Weather description is "+ response.body.current.weather_descriptions[0]+" with today's temperature "+response.body.current.temperature+ " degree Celsius but it look's like "+ response.body.current.feelslike + " degree Celsius. Wind-Speed is "+ response.body.current.wind_speed + " and Humidity is "+ response.body.current.humidity)
        }
    })
} 

module.exports = forecast;