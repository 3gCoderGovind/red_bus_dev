const { mysql_connect } = require("../db_connection/mysql_connection");
const get_all_seats_by_bus_id=async (bus_id) =>{
    let seats=[];
    if(!bus_id) return seats;
    try{
          const seat_query=`select seat_id from seats where bus_id= "${bus_id}"`;
          const result=await mysql_connect(seat_query);
          for(let i=0;i<result.length;i++){
            seats.push(result[i]['seat_id']);
          }     
          return seats;
    }catch(error){
          return seats;
    }
}

module.exports={get_all_seats_by_bus_id};