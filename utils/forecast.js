const request = require('request')
const forecast = (latitude,longitude,callback)=>
{
const url = 'https://api.darksky.net/forecast/3b69d06cd4e5e6a60f82718fce2d4ddf/' + latitude + ','+ longitude
request({url, json:true}, (error,{body})=>
{
    if(error)
    {
       callback('Unable to connect to the location services',undefined)
    }
    else if(body.error){
        callback('unable to find your location !!!please search another!',undefined)
    }
    else 
    {
     callback(undefined, body.daily.data[0].summary+ ' It is currently '+ body.currently.temperature + ' degrees out.There is a '+ body.currently.precipProbability + '% chance of rain'

)}
})
}

module.exports = forecast