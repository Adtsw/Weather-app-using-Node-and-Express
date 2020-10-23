const request = require('request')

const geocode = (place, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=pk.eyJ1IjoiZHVkZTIwMTYiLCJhIjoiY2tnYnMwdXZ6MDN1NTJ4cXpyam40aXVsNyJ9.v5a0IkCe6oHZsHrQakKB2A`

    request(url, {json: true},( error, {body}) => {
        if(error){
            callback('Unable to process the request', undefined)
        } else if(body.features.length === 0){
            callback('Unpad, spelling bhi thik kar le', undefined)
        }else{
            callback(undefined,
                {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                })
        }
    })
}

module.exports = geocode

