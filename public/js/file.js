
// fetch('https://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>
//     {
//         console.log(data)
//     })
// })
// fetch('http://localhost:3000/weather?address=mnbjui').then((response)=>
// {
    
//     response.json().then((data1)=>{
//         if(error)
//         {
//          console.log('error')
//         }
//         else
//         {
//         console.log('location:'+data1.location)
//         console.log('forecast:'+data1.forecast)   
//         }
//     })
// })
// fetch('http://localhost:3000/weather?address=mentrajpally').then((response) => { 
//          response.json().then((data) => {
//               if (data.error) {       
//            console.log(data.error)    
//               } 
//               else
//                {   
//                 console.log(data.location)       
//                 console.log(data.forecast)         
//              }     
//              })
//               })  
              
             const weatherForm =  document.querySelector('form')
             const search = document.querySelector('input')
             const messageOne = document.querySelector('#message-1')
             const messageTwo = document.querySelector('#message-2')
            
             weatherForm.addEventListener('submit',(e)=>
             {
                  const location = search.value 
                  
               e.preventDefault()
               messageOne.textContent = 'Loading....'
               messageTwo.textContent = ''
               fetch('/weather?address='+location).then((response) => { 
                  response.json().then((data) => {
                       if (data.error) {       
                    messageOne.textContent = data.error
                       } 
                       else
                        {   
                         messageOne.textContent = data.location      
                         messageTwo.textContent = data.forecast           
                      }     
                      })
                       })  
             })