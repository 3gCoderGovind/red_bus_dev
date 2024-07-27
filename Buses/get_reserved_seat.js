const { mysql_connect } = require("../db_connection/mysql_connection");

const get_reserved_seats_by_bus_id = async (bus_id, date) => {
    let seats = [];
    if (!bus_id || !date) return seats;

    // Date format in YYYY-MM-DD
    const travel_date = formatDateTime(date);

    try {
        const seat_query = `SELECT seat_id FROM reservations WHERE bus_id = "${bus_id}" AND date_of_journey BETWEEN "${travel_date[0]}" AND "${travel_date[1]}"`;
        const result = await mysql_connect(seat_query);

        for (let i = 0; i < result.length; i++) {
            seats.push(result[i]['seat_id']);
        }
        return seats;
    } catch (error) {
        return seats;
    }
}

function formatDateTime(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return [
        `${year}-${month}-${day} 00:00:00`,
        `${year}-${month}-${day} 23:59:59`
    ];
}

module.exports = { get_reserved_seats_by_bus_id };
