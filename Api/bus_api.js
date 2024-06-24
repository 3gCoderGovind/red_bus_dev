const { v4: uuidv4 } = require('uuid');
const { mysql_connect } = require("../db_connection/mysql_connection");
const {get_route_distance}=require('../ThirdApi/get_route_distance');

const get_bus_by_route=async(req,res)=>{
    try{
        const source_location_id=req?.body?.source_location;
        const destination_location_id=req?.body?.destination_location;
        const arrive_buses_array=[];
        if(!source_location_id || !destination_location_id){
            return res.status(400).send({"error":"enter valid locations"});
        }
        const source_location_query=`select bus_array from locations where location_id="${source_location_id}"`;
        const destination_location_query=`select bus_array from locations where location_id="${destination_location_id}"`;
  
        const source_location_buses= await mysql_connect(source_location_query);
        const destination_location_buses= await mysql_connect(destination_location_query);
       // console.log(JSON.parse(source_location_buses[0].bus_array).buses);
       const all_buses = {};
       const source_buses = JSON.parse(source_location_buses[0].bus_array).buses;
       for (let i = 0; i < source_buses.length; i++) {
           if (all_buses[source_buses[i]]) {
            all_buses[source_buses[i]]++;
           } else {
            all_buses[source_buses[i]] = 1;
           }
       }
       
       const destination_buses = JSON.parse(destination_location_buses[0].bus_array).buses;
       for (let i = 0; i < destination_buses.length; i++) {
           if (all_buses[destination_buses[i]]) {
            all_buses[destination_buses[i]]++;
           } else {
            all_buses[destination_buses[i]] = 1;
           }
       }
  
     for(let key in all_buses){
         if(all_buses[key]>1) arrive_buses_array.push(key);
     }

     return res.status(200).send(arrive_buses_array);
    }
    catch(error){
        console.log(error);
        return res.status(404).send({"error":"invalid location"});
    }
}

const get_bus_by_number=async(bus_number)=>{
    try{
        const query=`select * from buses where bus_number="${bus_number}"`;
        return await mysql_connect(query);

    }catch(error){
        return 0;
    }

}
const create_bus=async(req,res)=>{
    try{   
        const bus_name=req?.body?.bus_name;
        const bus_number=req?.body?.bus_number;
        const owner_id=req?.body?.ownner_id;
        const source_point=req?.body?.source_point;
        const destination_point=req?.body?.destination_point; 
        const total_seat=req?.body?.total_seat;
        const bus_type=req?.body?.bus_type;
        const route_points=req?.body?.route_points;   
        // get bus by bus_number
        const bus_data=await get_bus_by_number(bus_number);
        if(bus_data.length) return res.status(400).send({"error":"Bus Already Registred"});
        try{
            const route_distance=await get_route_distance(route_points);  
            if(!route_distance)  return res.status(400).send({"error":"Route Not Found !!!"});
            const bus_id='BUS-'+uuidv4();
            const bus_query=`insert into buses(bus_id,bus_name,bus_number,owner_id,source_point,destination_point,total_seat,bus_type,route_points)
                         values(?,?,?,?,?,?,?,?,?)`;
            const bus_values=[bus_id,bus_name,bus_number,owner_id,source_point,destination_point,total_seat,bus_type, JSON.stringify({"route":route_points})];      
            // first verify bus by admin then registered in db
            //
            const result=await mysql_connect(bus_query,bus_values);
            
            try{          
            // if registerd then push bus in location table route point array
            const update_location_query = `UPDATE locations
            SET bus_array = JSON_ARRAY_APPEND(bus_array, "$.buses", ?)
            WHERE location_id IN (?)`;

            const registerd_bus_data=await get_bus_by_number(bus_number);
            const location_values=[registerd_bus_data[0].bus_id, route_points]
            await mysql_connect(update_location_query,location_values);
            return res.status(200).send({"data":"Bus registered"});
           }catch(error){
            return res.status(500).send({"error":error,"data":"Bus Not registered"});
           }
        }catch(error){
            return res.status(400).send({"error":"Route Not found"});
        }       
    }
    catch(error){
         return res.status(400).send({"error":"Invalid Bus Data"});
    }

}

const update_bus=async(req,res)=>{
    try{

    }
    catch(error){

    }
}

const delete_bus=async(req,res)=>{
    try{

    }
    catch(error){

    }
}


module.exports={get_bus_by_route,create_bus,update_bus,delete_bus};