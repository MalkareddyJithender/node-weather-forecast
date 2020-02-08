const request = require('request')

const geocode = (address,callback)=>
{
  const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibWFsa2FyZWRkeWppdGhlbmRlciIsImEiOiJjazRtcHMxMmgyY2Z0M21xd3IwZGJobHNlIn0.w7ZcRIi3TlsAU579IsL7pg&limit=1'
  
  request({url,json:true}, (error,response)=>{
      if(error)
      {
          callback('Unable to find your location services!', undefined)
      }
      else if(response.body.features.length === 0)
      {
          callback('unable to find your location!please search once again!',undefined)
      }
      else{
          callback(undefined,{
        latitude:response.body.features[0].center[1],
        longitude:response.body.features[0].center[0],
        location:response.body.features[0].place_name
          })
        }
    })
}

module.exports = geocode

// geocode('Mentrajpally Nizamabad India',(error,data)=>
// {
//     console.log('error',error)
//     console.log('data',data)
// })


// module.exports = geocode 




// const request = require('request') 
 
// const geocode = (address, callback) => {     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcn J4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1' 
 
//     request({ url: url, json: true }, (error, response) =>
//      {         if (error) {             
//          callback('Unable to connect to location services!', undefined)         } 
//         //  else if() {            
//             //   callback('Unable to find location. Try another search.', undefined)         }
//                else {            
//              callback(undefined, {               
//              latitude: response.body.features[0].center[0],            
//              longitude: response.body.features[0].center[1],  
//                        })         }     }) } 
 
// //module.exports = geocode
// geocode('Philadelphia', (error,data)=>
// {
//     console.log('Error',error)
//     console.log('Data',data)
// })