const { query } = require("express");
const { mysql_connect } = require("../db_connection/mysql_connection");
const axios = require('axios');

const get_route_distance=async (stop_points)=>{
    const travel_distance=0;
    const has_route=0;
    const travel_time=0;
    const points=[];
    if(stop_points.length<2) return 0; 
    for(var i=0;i<stop_points.length;i++){
       const location_coordinate=await mysql_connect(`select * from locations where location_id="${stop_points[i]}"`);
       points.push([location_coordinate[0].lan,location_coordinate[0].lat]);
    }
  
    const apiUrl = 'https://graphhopper.com/api/1/matrix?key=3c694a5d-f5e1-47b2-8b5d-d7d4fe89518e';
    return await axios.post(apiUrl, {
        "points": [points[0],points[0],points[points.length-1]
          ],
          "point_hints": [
            "Copenhagen Street",
            "Richmond Avenue",
            "White Lion Street"
          ],
          "out_arrays": [
            "weights",
            "times",
            "distances"
          ],
          "vehicle": "car"
    
    })
    .then(response => {
      console.log("distance",response.data.distances[0][2])
      return response.data.distances[0][2]; 
    })
    .catch(error => {     
      return 0;
    });
    
}

module.exports={get_route_distance};