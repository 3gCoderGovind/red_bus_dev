// get distance and time
const { mysql_connect } = require("../db_connection/mysql_connection");
const { v4: uuidv4 } = require('uuid');

const create_reservation=async (req,res)=>{
    try{
          const bus_id= req?.body?.bus_id;
          const seat_id= req?.body?.seat_id;
          const user_id= req?.body?.user_id;
          const travel_date= req?.body?.date;
          const travel_time= req?.body?.time;
          const source_location= req?.body?.source_location;
          const destination_location= req?.body?.destination_location;
          const payment_id= req?.body?.payment_id;
          const total_distance= req?.body?.total_distance;
          const total_duration= req?.body?.total_duration;
          const total_amount= req?.body?.total_amount;
          const boarding_location= req?.body?.boarding_location;
          const reservations_date = new Date();
          // create reservation id
          const reservations_id='RES-'+uuidv4();
          // create reservation ticket id
          const ticket_id='T12345';
          // create pnr number
          const pnr_number='P12345';
          const reservation_query = `INSERT INTO reservations 
          (reservation_id, pnr_number, bus_id, seat_id, user_id, payment_id, ticket_id, source_location, destination_location, total_distance, total_duration, total_amount, date_of_reservation, date_of_journey, time_of_journey, boarding_location, status) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      
        const reservation_values = [reservations_id, pnr_number, bus_id, seat_id, user_id, payment_id, ticket_id, source_location, destination_location,total_distance,
                                   total_duration, total_amount, reservations_date, travel_date, travel_time, boarding_location, 'completed'
                                 ];
       const result=await mysql_connect(reservation_query,reservation_values);
       console.log(result);
        res.status(200).send("reservation created");
    }catch(error){
        res.status(500).send({"error":error});
       // reservation failed
    }
}

module.exports={create_reservation};