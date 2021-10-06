const request = require('request');

const geo = (address, callback) => {
    const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+ '.json?access_token=pk.eyJ1Ijoic2hpdmFyZXZhbnRoLXJlZGR5LWxlYnVydSIsImEiOiJja3VjaTMzdHgxMG96MnFubm93OXA1d2VxIn0.NV7VVcKrKjX5G7Sw6jV6OA';

    request({url: geoCodeUrl, json: true}, (error, response) => {
        if(error)
        {
            callback('Unable to find Weather Service', undefined)
        }
        else if(response.body.features.length === 0) {
            callback('Unable to find the location', undefined)
        }
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geo