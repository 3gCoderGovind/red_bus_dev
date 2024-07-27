const { v4: uuidv4 } = require('uuid');
const { mysql_connect } = require("../db_connection/mysql_connection");

const create_users = async (req, res) => {
    try {
//         const seat_table = `
//   CREATE TABLE IF NOT EXISTS seats(
//     seat_id VARCHAR(50) PRIMARY KEY,
//     seat_number VARCHAR(50),
//     bus_id VARCHAR(50),
//     seat_type VARCHAR(50),
//     seat_price FLOAT,
//     FOREIGN KEY (bus_id) REFERENCES buses(bus_id)
// )`;
        

    const reservation_table = `
    CREATE TABLE IF NOT EXISTS reservations (
        reservation_id VARCHAR(50) PRIMARY KEY,
        pnr_number VARCHAR(50),
        bus_id VARCHAR(50),
        seat_id VARCHAR(50),
        user_id VARCHAR(50),
        payment_id VARCHAR(50),
        ticket_id VARCHAR(50), 
        source_location VARCHAR(50),
        destination_location VARCHAR(50),
        total_distance FLOAT,
        total_duration FLOAT,
        total_amount FLOAT,
        date_of_reservation TIMESTAMP,
        date_of_journey TIMESTAMP,
        time_of_journey TIMESTAMP,
        boarding_location VARCHAR(50),
        status ENUM('pending', 'completed', 'failed') NOT NULL DEFAULT 'pending',
        FOREIGN KEY (bus_id) REFERENCES buses(bus_id),
        FOREIGN KEY (seat_id) REFERENCES seats(seat_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (payment_id) REFERENCES payments(payment_id),
        FOREIGN KEY (source_location) REFERENCES locations(location_id),
        FOREIGN KEY (destination_location) REFERENCES locations(location_id),
        FOREIGN KEY (boarding_location) REFERENCES locations(location_id)
    )
    `;
    const payment_table = `
    CREATE TABLE IF NOT EXISTS payments (
        payment_id VARCHAR(50) PRIMARY KEY,
        transaction_id VARCHAR(100) NOT NULL,
        user_id VARCHAR(50) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        payment_date DATETIME NOT NULL,
        payment_method VARCHAR(50) NOT NULL,
        status ENUM('pending', 'completed', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
        currency VARCHAR(10) NOT NULL,
        description TEXT,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    )
    `;
    
    //     ' 
    //     '
        // let location=await mysql_connect('SELECT * FROM ind_db');
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


     
//         const user_table = `
//          CREATE TABLE IF NOT EXISTS users (
//     user_id VARCHAR(50) PRIMARY KEY,
//     user_type VARCHAR(50),
//     first_name VARCHAR(50) NOT NULL,
//     last_name VARCHAR(50),
//     email VARCHAR(50) NOT NULL UNIQUE,
//     password VARCHAR(50) NOT NULL,
//     phone_number VARCHAR(50)
// )`;

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
        
     
try {
    const [reservation_result, payment_result] = await Promise.all([
     //   mysql_connect(seat_table),
        mysql_connect(reservation_table),
        mysql_connect(payment_table)
    ]);

    ///console.log('Tables created successfully:', { seat_result, reservation_result, payment_result });
} catch (error) {
   // console.error('Error creating tables:', error);
}
     
//         // console.log(u_result, b_result, l_result);
        return res.status(200).send({ result: 'ok' });
    } catch (error) {
        console.error(error);
        return res.status(400).send({ error: error.message });
    }
};

module.exports = { create_users };
