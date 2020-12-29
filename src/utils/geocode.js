const req = require('request')

const getGeo = (address,callback)=>{
    const add = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYXNoaWsxNTUiLCJhIjoiY2tpY3dqN3U0MDNzMTJxcndvdTU0cmtlNyJ9.O1lgErQXSCG_ZuON4BniPA`;
    req({url: add,
    json:true,}, (error,responseFromApi)=>{

        if(error){
            console.log(error)
            callback("Error Due to internet Connectivity..", undefined)
        }else if(responseFromApi.body.features.length === 0){
            callback("No such Location Found.. Search with valid location", undefined)
        }else{
            callback(undefined,{
                latitude : responseFromApi.body.features[0].center[0],
                longitude : responseFromApi.body.features[0].center[1],
                location : responseFromApi.body.features[0].place_name
            })
        }


    })

}

module.exports = getGeo;