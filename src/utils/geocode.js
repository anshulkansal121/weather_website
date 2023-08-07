const request = require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYW5zaHVsa2Fuc2FsIiwiYSI6ImNsa201aHpmZDAwdmMzdHBnY3IwcWl4dnAifQ.q3FOmO5uuGCr42Bt3oVIZg&limit=1'
    request({url, json:true}, (error,response)=>{
        if(error){
            callback('Unable to connect to location services',undefined)
        }else if(response.body.features == null ){
            // console.log('Unable to find location, try again with different parameters')
            callback('Unable to find location, try again with different parameters',undefined)
        }else{
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode