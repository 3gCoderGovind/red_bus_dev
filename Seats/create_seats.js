const {mysql_connect}=require("../db_connection/mysql_connection");
const { v4: uuidv4 } = require('uuid');

const create_bus_seat=async (req,res)=>{
    try{
        const bus_id = req?.body?.bus_id;
        const seat_type = req?.body?.seat_type;
        const seat_price = req?.body?.seat_price;
        const seat_number= req?.body?.seat_number;
        const seat_id = 'SEA-'+uuidv4();
        const seat_query = `INSERT INTO seats (seat_id, seat_number, seat_type, seat_price, bus_id) 
                            VALUES (?, ?, ?, ?, ?)`;
        const seat_query_values = [seat_id, seat_number, seat_type, seat_price, bus_id];

        const result=await mysql_connect(seat_query,seat_query_values);
        return res.status(200).send(result);

    }catch(error){
       return res.status(500).send({"error":error});
    }
}

module.exports={ create_bus_seat };
