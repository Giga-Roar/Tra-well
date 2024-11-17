import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

export const getNote = async (id) => {
    const [rows] = await pool.query(`
        SELECT * from notes
        WHERE id = ?
        ;`, [id]);
    return rows[0];
}

export const getHotels = async (city_name, min_ratings, max_ratings, city_id) => {
    min_ratings = min_ratings || 1;
    max_ratings = max_ratings || 5;
    city_id  = city_id || 0;
    let hotels = "";
    if(city_id != 0){
        [hotels] = await pool.query(`
            SELECT hotel_id, hotel_name, rating from hotel where city_id=? AND rating > ? AND rating < ?;
             `, 
             [city_id , min_ratings - 1, max_ratings + 1]
         );
    }
    else if(city_name){
        [hotels] = await pool.query(`
           SELECT * from (hotel NATURAL JOIN city) where (city_name=? AND rating > ? AND rating < ?);
            `, 
            [city_name , min_ratings - 1, max_ratings + 1]
        );
    }
    else{
        [hotels] = await pool.query(`
           SELECT * from (hotel NATURAL JOIN city) where rating > ? AND rating < ?; 
            `, [min_ratings - 1, max_ratings + 1]);
    }
    return hotels;
}

//fix the hotel number issue and amount issue
export const book = async (data) => {
    const bookingCount = (await pool.query("SELECT count(*) as count FROM booking;"))[0][0].count;
    const [returned] = await pool.query(`INSERT INTO booking VALUE
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `, [bookingCount + 1, data.firstName, data.lastName, data.email, data.hotel_id, (new Date()).toISOString().slice(0, 10), data.checkInDate, data.checkOutDate, 500, data.phoneNumber, data.booker_age]);
    console.log(returned);
}


export const devQuery = async (query) => {
    const [returned] = await pool.query(query);
    return returned;
}

export const getAllBookings = async () => {
    const [result] = await pool.query("SELECT * FROM booking");
    return result;
}

export const getHotelsIdName = async (selected_city) => {
    const [[hotels]] = await pool.query("CALL get_hotels_id_name(?);", [selected_city]);
    return hotels;
}

export const getCities = async () => {
    const [cities] =  await pool.query("SELECT city_id, city_name FROM city;");
    return cities;
}
