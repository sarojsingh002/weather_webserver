const request = require('request')

const forecast =(lat,long,callback) =>
{
   // const url = 'https://api.darksky.net/forecast/978e651476eea734f46ddb3f88f2761e/12.9656,77.6063?units=si'
    const url = 'https://api.darksky.net/forecast/978e651476eea734f46ddb3f88f2761e/'+ encodeURIComponent(lat)+','+encodeURIComponent(long)+"?units=si"

    request({url, json:true},(error,{body}) =>
    {
        if(error)
        callback('Unable to connect to the internet')
        else if(body.error)
        {
            callback('Incorrect information, data not found')
        }
        else
        {
            console.log(body.daily.data[0])
            callback(undefined,{
                 res: body.daily.data[0].summary+". It is currently "+body.currently.temperature+" degrees out."+" The high today is "+body.daily.data[0].temperatureHigh+ " with a low of "+body.daily.data[0].temperatureLow + ". There is "+body.currently.precipProbability * 100+"% chance of rain."
          
            })

        }
    })
}
module.exports = forecast