const request = require('request')

forecast = (latitude, longitude, callback) => {
    const url = 
    `http://api.weatherstack.com/current?access_key=babf1e2ae60524e208f6f2dc08113161&query=${latitude},${longitude}`
    
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect server', undefined)
        } else if (response.body.error) {
            callback('unable to find location', undefined)
        } else {
            loc =`temp is  ${response.body.current.weather_descriptions}. It is currently ${response.body.current.temperature} degree out. there is a ${response.body.current.precip} % of chance`
            callback(undefined, loc)
        }
    
    })
}
module.exports = forecast