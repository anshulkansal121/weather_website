const request  = require('request')
const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=3990cc6ed6449780f225dbb83ef56744&query=' + latitude + ','+ longitude+'&units=f'
    request({url, json:true},(error, response)=>{
        if(error){
            callback('Unable to connect to Weather Service',undefined)
        }else if(response.body.error){
            callback('Unable to find Location',undefined)
        }else{
            callback(undefined,response.body.current.weather_descriptions[0] +'. It is currently ' + response.body.current.temperature + ' degrees out. But it feels like '+ response.body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast