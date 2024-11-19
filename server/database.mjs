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
    const bookingID = data.bookingID.slice(1);
    var room_query_values = "";
    for(let i = 0; i < data.rooms.length; i++){
        room_query_values += `(${data.hotel_id},${(data.rooms[i]).slice(5)},${bookingID}),`;
    }
    room_query_values = room_query_values.slice(0, room_query_values.length-1) + ';'


    const bookingCount = (await pool.query("SELECT count(*) as count FROM booking;"))[0][0].count;
    const [returned] = await pool.query(`INSERT INTO booking VALUE
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `, [bookingID || bookingCount + 1, data.firstName, data.lastName, data.email, data.hotel_id, (new Date()).toISOString().slice(0, 10), data.checkInDate, data.checkOutDate, 500, data.phoneNumber, data.booker_age]);

    const [rooms_message] = await pool.query(`INSERT INTO rooms VALUES ${room_query_values}`);
}

// console.log(await book({
//     bookingID : "#123",
//     firstName : "firstName",
//     lastName : "lastName",
//     phoneNumber: "0213",
//     email : "email",
//     checkInDate : "2024-11-20",
//     checkOutDate : "2024-11-22",
//     hotel_id : 1,
//     booker_age : 19,
//     rooms : ["Room 1", "Room 5", "Room10"]
// }))


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

export const getNumRooms = async (hotel_id) => {
    const [[numRoomsObject]] = await pool.query("SELECT num_rooms FROM hotel where hotel_id = ?;", 
        [hotel_id]
    );
    return numRoomsObject.num_rooms;
}

export const login = async (username, password) => {
    const [[db_login]] = await pool.query("SELECT host_username, host_password FROM host_credentials WHERE host_username = ?;",
        [username]
    );
    if(db_login){
        return [db_login.host_password === password, db_login.host_username];
    }
    else{
        return [false, ""];
    }
}

export const getCheckedRooms = async (hotel_id) => {
    const [checkedRoomsObjectList] = await pool.query(`SELECT room_no FROM rooms WHERE hotel_id = ?;`,
        [hotel_id]
    );

    const checkedRooms = checkedRoomsObjectList.map(item => item.room_no);
    return checkedRooms;
}




