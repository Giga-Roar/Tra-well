CREATE DATABASE tra_well;
use tra_well;

CREATE TABLE city(
    city_id int PRIMARY KEY,
    city_name varchar(30),
    state_name varchar(20)
);

CREATE TABLE hotel(
    hotel_id int NOT NULL PRIMARY KEY,
    hotel_name varchar(30),
    hotel_address varchar(70),
    rating float,
    num_rooms int,
    city_id INT,
    FOREIGN KEY (city_id) references city(city_id)
);

CREATE TABLE host_credentials(
    host_username varchar(30) PRIMARY KEY,
    host_password varchar (20) NOT NULL,
    hotel_id INT NOT NULL,
    FOREIGN KEY (hotel_id) references hotel(hotel_id)
);

CREATE TABLE booking(
    booking_id int NOT NULL PRIMARY KEY,
    first_name varchar(20) NOT NULL,
    last_name varchar(20),
    email varchar(40),
    hotel_id int NOT NULL,
    booking_date date,
    check_in_date date,
    check_out_data date,
    total_amount int NOT NULL,
    phone_number varchar(14) NOT NULL,
    booker_age int NOT NULL,
    FOREIGN KEY (hotel_id) references hotel(hotel_id)
);

INSERT INTO city VALUES 
(1, "Bengaluru", "Karnataka"),
(2, "Mangaluru", "Karnataka"),
(3, "Shivamogga", "Karnataka"),
(4, "Mumbai", "Maharastra"),
(5, "Pune", "Maharastra"),
(6, "Nagpur", "Maharastra"),
(7, "New Delhi", "Delhi NCR"),
(8, "Ahmedabad", "Gujarat"),
(9, "Gandhinagar", "Gujarat"),
(10, "Vadodara", "Gujarat"),
(11, "Dwarka", "Gujarat"),
(12, "Mysuru", "Karnataka"),
(13, "Kolkata", "West Bengal"),
(14, "Darjeeling", "West Bengal");

INSERT INTO hotel VALUES
(1, "Rohit's Vadapav Center", "Opposite to Wankhede stadium, south gate", 4, 30, 4),
(2, "ITC Maratha", "Sahar Village, Andheri East, Mumbai, Maharashtra 400099", 5, 50, 4),
(3, "Aquaman Resort", "Opposite to Pattanagere shed, Bengaluru", 5, 20, 1),
(4, "Ocean Pearl", "Navabharath Cir, Kodailbail, Mangaluru, Karnataka 575003", 4, 40, 2),
(5, "Bengaluru Grand", "MG Road, Bengaluru, Karnataka", 4.5, 35, 1),
(6, "Mangalore Beach Resort", "Panambur Beach, Mangaluru, Karnataka", 4, 40, 2),
(17, "Shivamogga Safari Lodge", "Jog Falls Road, Shivamogga, Karnataka", 3.5, 25, 3),
(18, "Mumbai Skyline Hotel", "Marine Drive, Mumbai, Maharashtra", 5, 50, 4),
(19, "Pune Heritage Inn", "Shaniwar Wada, Pune, Maharashtra", 4, 30, 5),
(20, "Nagpur Central Hotel", "Sitabuldi, Nagpur, Maharashtra", 3, 20, 6),
(21, "Delhi Palace Hotel", "Connaught Place, New Delhi, Delhi NCR", 4.5, 45, 7),
(22, "Ahmedabad Heritage", "Sabarmati Ashram Road, Ahmedabad, Gujarat", 4, 35, 8),
(23, "Gandhinagar Lake View", "Sarkhej-Gandhinagar Highway, Gandhinagar, Gujarat", 3.5, 25, 9),
(24, "Vadodara Royal Palace", "Laxmi Vilas Palace Road, Vadodara, Gujarat", 5, 50, 10),
(25, "Dwarka Beach Resort", "Dwarka Beach, Dwarka, Gujarat", 4, 40, 11),
(26, "Mysore Palace View", "Mysore Palace, Mysore, Karnataka", 4.5, 35, 12),
(27, "Kolkata Heritage", "Park Street, Kolkata, West Bengal", 4, 30, 13),
(28, "Darjeeling Himalayan View", "Mall Road, Darjeeling, West Bengal", 3.5, 25, 14),
(29, "Bengaluru Tech Park Inn", "Whitefield, Bengaluru, Karnataka", 4, 40, 1),
(30, "Mangalore Spice Hotel", "Kudla, Mangaluru, Karnataka", 3, 30, 2),
(31, "Shivamogga Forest Lodge", "Bhadra Wildlife Sanctuary, Shivamogga, Karnataka", 4.5, 35, 3),
(32, "Mumbai Gateway Hotel", "Colaba Causeway, Mumbai, Maharashtra", 5, 50, 4),
(33, "Pune IT Park Hotel", "Hinjewadi, Pune, Maharashtra", 4, 40, 5),
(34, "Nagpur Orange City Hotel", "Sadar, Nagpur, Maharashtra", 3.5, 35, 6);

INSERT INTO host_credentials VALUES
("Rocky", "eldorado", 1),
("Devaratha", "salaar", 3),
("Shiva", "kantara", 2);

INSERT INTO booking VALUES
(1, 'John', 'Doe', 'johndoe123@yahoo.com', 1, '2024-11-01', '2024-11-10', '2024-11-15', 5000, "+919876543210", 21),
(2, 'Jane', 'Smith', 'janesmith500dos@gmail.com',1, '2023-12-15', '2023-12-20', '2023-12-25', 3500, "+911234567890", 18);

DELIMITER $$
CREATE PROCEDURE get_hotels_id_name(IN selected_city_id INT)
BEGIN
    SELECT hotel_id, hotel_name, rating FROM hotel NATURAL JOIN city WHERE city_id = selected_city_id;
END;
$$
DELIMITER ;


DELIMITER $$

CREATE TRIGGER check_age_before_insert
BEFORE INSERT ON booking
FOR EACH ROW
BEGIN
    IF NEW.booker_age < 18 THEN
        SIGNAL SQLSTATE "45000"
        SET MESSAGE_TEXT = "Age must be 18 or older to make a booking.";
    END IF;
END $$

DELIMITER ;
