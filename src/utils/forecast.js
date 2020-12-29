const request = require('request')

const forecast = (placename,callback)=>{

    const url = `http://api.weatherapi.com/v1/current.json?key=36c25337ff3840139e852910200612&q=${placename}`
    request({url : url,
    json:true}, (error,responseFromApi)=>{
        if(error){
            console.log(error)
            callback("Sorry something Wrong went with internet connectivity..", undefined)
        }else if (responseFromApi.body.error){
            callback('Wrong Location Has been provided ....', undefined)
        }else{
            callback(undefined,{
                tempc : responseFromApi.body.current.temp_c,
                name : responseFromApi.body.location.name,
                condition : responseFromApi.body.current.condition.text,
                wind_mph : responseFromApi.body.current.wind_mph,
                wind_kmph : responseFromApi.body.current.wind_kmp,
                
            })
        }
    })


}

module.exports = forecast;