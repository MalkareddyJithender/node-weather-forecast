const request = require('request')
const forecast = (latitude,longitude,callback)=>
{
const url = 'https://api.darksky.net/forecast/3b69d06cd4e5e6a60f82718fce2d4ddf/' + latitude + ','+ longitude +"?units=si"
request({url, json:true}, (error,response)=>
{
    if(error)
    {
       callback('Unable to connect to the location services',undefined)
    }
    else if(response.body.error){
        callback('unable to find your location !!!please search another!',undefined)
    }
    else 
    {
     callback(undefined, response.body.daily.data[0].summary+ ' It is currently '+ response.body.currently.temperature + '(°C) degrees out.There is a '+ response.body.currently.precipProbability + '% chance of rain'

)}
})
}

module.exports = forecast