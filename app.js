const path = require('path')
const hbs = require('hbs')
const express = require('express')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

//definig a path for express
 const app = express()
 const port = process.env.PORT || 3000


 const staticpath = path.join(__dirname,'/public')
 const viewspath = path.join(__dirname,'/templates/views')
 const partialspath = path.join(__dirname,'/templates/partials')

//set hbs engine and views location
 app.set('view engine','hbs')
 app.set('views',viewspath)
 hbs.registerPartials(partialspath)

 //setup static directory
 app.use(express.static(staticpath))

 app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.get('',(req,res)=>
{
    res.render('index',{
        title:'Weather',
        name:'Jithender Malkareddy'
    })
})
     
// app.get('/',(req,res)=>
// {
//     res.render('index',{
//         title:'Weather',
//         name:'Jithender Reddy'
//     })
// })

    app.get('/about',(req,res)=>
    {
        res.render('about',{
            title:'About me',
            name:'Jithender Malkareddy'
        })
    })
    app.get('/help',(req,res)=>
    {
        res.render('help',{
            title:'Help',
            name:'Jithender Malkareddy'
        })
    })


    app.get('/weather',(req,res)=>
    {
        if(!req.query.address)
        {
      return res.send({
          error:'you must provide an address!'
      })
    }
   
    geocode(req.query.address,(error,data)=>{         //{latitude,longitude,location}
  if(error)
  {
      return res.send({error})   
  }

  forecast(data.latitude,data.longitude,(error,forecastdata)=>
  {
      
      if(error)
      {
          return res.send({error})
      }

      res.send({
          address:req.query.address,
          location:data.location,
          forecast:forecastdata
      })
  })
    })
      
})

    app.get('/help/*',(req,res)=>
    {
        res.render('404',{
            title:'Help page',
            name:'Jithender Malkaredddy',
            errormessage:'Help page do not found!!!'
        })
    })
    app.get('*',(req,res)=>
    {
        res.render('404',{
            title:404,
            name:'Jithender Malkareddy',
            errormessage:'Page Not found!!!!'
        })
    })


app.listen(port,()=>
{
    console.log('server is up on port '+port)
})


