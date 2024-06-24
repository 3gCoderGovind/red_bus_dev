const { v4: uuidv4 } = require('uuid');
const { mysql_connect } = require("../db_connection/mysql_connection");

const create_users = async (req, res) => {
    try {
        // let location=await mysql_connect('SELECT * FROM city_info');
        // location.forEach(async element => {
        //     const id = 'LOC-'+uuidv4();
        //      let query=`insert into locations(location_id,location_name,location_city,location_state,location_country,lan,lat,bus_array)
        //            value(?,?,?,?,?,?,?,?)`;
        //            const values = [
        //             id,
        //             element.city_ascii,
        //             element.city_ascii,
        //             element.admin_name,
        //             element.country,
        //             element.lng,
        //             element.lat,
        //             JSON.stringify({ buses: [] }) // Properly format the JSON object as a string
        //           ];
          
        //     let ans=await mysql_connect(query,values);
        // });


     
        // const user_table = `
        //     CREATE TABLE IF NOT EXISTS users (
        //         user_id VARCHAR(50) PRIMARY KEY,
        //         user_type VARCHAR(50),
        //         first_name VARCHAR(50) NOT NULL,
        //         last_name VARCHAR(50),
        //         email VARCHAR(50) NOT NULL UNIQUE,
        //         password VARCHAR(50) NOT NULL,
        //         phone_number VARCHAR(20),
        //     )`;

        // // const seat_table=`create table if not exists seat(
        // // seat_id varchar(50) primary key,
        // // seat_number int,
        // // seat_type varchar(50),
        // // seat_location varchar(50),
        // // seat_price int,
        // // bus_id varchar(50),
        // // status bool,
        // // FOREIGN KEY (bus_id) REFERENCES buses(bus_id),
        // // )`;
        // const bus_table = `
        //     CREATE TABLE IF NOT EXISTS buses (
        //         bus_id VARCHAR(255) PRIMARY KEY,
        //         bus_name VARCHAR(50),
        //         bus_number VARCHAR(50) NOT NULL UNIQUE,
        //         owner_id VARCHAR(50),
        //         source_point VARCHAR(50),
        //         destination_point VARCHAR(50),
        //         total_seat INT,
        //         bus_type VARCHAR(50),
        //         route_points JSON,
        //         FOREIGN KEY (owner_id) REFERENCES users(user_id),
        //         FOREIGN KEY (source_point) REFERENCES locations(location_id),
        //         FOREIGN KEY (destination_point) REFERENCES locations(location_id)
        //     )`;

        // const location_table = `
        //     CREATE TABLE IF NOT EXISTS locations (
        //         location_id VARCHAR(50) PRIMARY KEY,
        //         location_name VARCHAR(50),
        //         location_city VARCHAR(50),
        //         location_state VARCHAR(50),
        //         location_country varchar(50),
        //         lan float,
        //         lat float,
        //         bus_array JSON
        //     )`;
        
        // const [l_result, u_result, b_result] = await Promise.all([
        //     mysql_connect(location_table),
        //     mysql_connect(user_table),
        //     mysql_connect(bus_table)
        // ]);

        // console.log(u_result, b_result, l_result);
        return res.status(200).send({ result: 'ok' });
    } catch (error) {
        console.error(error);
        return res.status(400).send({ error: error.message });
    }
};

module.exports = { create_users };
