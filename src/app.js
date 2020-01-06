//This helps in loading file 
//and is a core node module
const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//so there is single template of headersc
//across htm page
 const hbs = require('hbs')
//this is how we know about where our file system 
// is located
console.log(__dirname)

//this is set by heroku so we are extracting it we can also set our own port
// or tell if the first value doesn't exist it falls back to the port 3000
const port = process.env.PORT || 3000


//express is a function
const app = express()
const pubdirect = path.join(__dirname,'../public')
//const about1 = path.json(__dirname,'../public')


const viewpath = path.join(__dirname,"../templates/views")
const partial_path  = path.join(__dirname,"../templates/partials")
//we install hbs manually and are using it to serve
//dynamic content to the user
app.set('view engine','hbs')
app.set('views',viewpath)
app.use(express.static(pubdirect))

//registering the partials, it takes partials to the directory
//ww
hbs.registerPartials(partial_path)


app.get('',(req,res)=>
{
    res.render('index',{
        title:'weather',
        name: ' Saroj'
    })
})

app.get('/about',(req,res)=>
{
    res.render("about",{
        title:'About',
        name: ' Saroj'
    })
})

app.get('/help',(req,res)=>
{
   res.render('help',{
       title: 'This is a help page ',
       name:'saroj'
   })
})

app.get('/weather',(req,res)=>
{
    const query_address = req.query.address
    if(!query_address)
        {
            return res.send("Provide an address")
        }
    else
    {
        geocode(query_address,(error,{latitude,longitude,location} ={})=>
            {
                if(error)
                {
                    return res.send({error})
                }
                else
                {
                    forecast(latitude,longitude,(error,forecastdata)=> {
                        res.send({
                            Place: location,
                            // Temperature :forecastdata.temp,
                            // Precipitation: forecastdata.precip,
                            Forecast_Data: forecastdata.res

                        })
                        
                       
                    })
                }
            })
    //res.send("Weather page" +req.query.address)
    }
})

app.get('/help/*',(req,res)=>
{
    res.render('error',{
        title: "404 Error",
        data:"Help article not found",
        name : 'Saroj'})
})



// for any other page and 404 page setup error
//* means match anything that hasn't been matched yet
app.get("*",(req,res)=>
{
    res.render('error',{
        title: "404 Error",
        data:'Page not Found',
        name : 'Saroj'})
})



//this starts the server and makes it listen on the 
//certain port
//for local machine 3000 is fine but for deployment we need to specify the port

app.listen(port,() =>
{
    console.log('server is up on port '+port)
})
































// app.get('/help',(req,res)=>
// {
//     res.send([{
//         name: 'saroj',
//         age: 23
//     },
//     {
// name: 'mango'}]
//     )
// })

// app.get('/about',(req,res)=>
// {
//     res.send("About page")
// })

// app.get('/weather',(req,res)=>
// {
//     res.send("Weather page")
// })

// app.com
// app.com/help
// app.com/about