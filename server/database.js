import mysql from 'mysql2'
import dotenv from 'dotenv'
// const mysql = require("mysql");
// const dotenv  = require("dotenv");
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

export const getHotels = async (city, min_ratings, max_ratings) => {
    min_ratings = min_ratings || 1;
    max_ratings = max_ratings || 5;
    console.log({min_ratings, max_ratings});
    let hotels = "";
    if(city){
        [hotels] = await pool.query(`
           SELECT * from (hotel NATURAL JOIN city) where (city_name=? AND rating > ? AND rating < ?);
            `, [city , min_ratings - 1, max_ratings + 1]);
    }
    else{
        [hotels] = await pool.query(`
           SELECT * from (hotel NATURAL JOIN city) where rating > ? AND rating < ?; 
            `, [min_ratings - 1, max_ratings + 1]);
    }
    return hotels;
}


export const devQuery = async (query) => {
    const [returned] = await pool.query(query);
    return returned;
}

// console.log(await getHotels('Mumbai', 0, 4));
// console.log(await devQuery("select * from hotel;"));
