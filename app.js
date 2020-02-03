const path = require('path')
const hbs = require('hbs')
const express = require('express')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

//definig a path for express
 const app = express()
 const staticpath = path.join(__dirname,'/public')
 const viewspath = path.join(__dirname,'/templates/views')
 const partialspath = path.join(__dirname,'/templates/partials')

//set hbs engine and views location
 app.set('view engine','hbs')
 app.set('views',viewspath)
 hbs.registerPartials(partialspath)

 //setup static directory
 app.use(express.static(staticpath))

app.get('',(req,res)=>
{
    res.render('index',{
        title:'Weather',
        name:'Jithender Reddy'
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
            name:'Jithender Reddy'
        })
    })
    app.get('/help',(req,res)=>
    {
        res.render('help',{
            title:'Help',
            name:'Jithender Reddy'
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
   
    geocode(req.query.address,(error,{latitude,longitude,location})=>{
  if(error)
  {
      return res.send({error})
  }

  forecast(latitude,longitude,(error,forecastdata)=>
  {
      if(error)
      {
          return res.send({error:error})
      }

      res.send({
          address:req.query.address,
          location,
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
// app.get('/g2',(req,res)=>
// {
//     res.send('Hi Mr.Jithender Reddy')
// })
app.listen(3000,()=>
{
    console.log('server is up on port 3000.')
})


