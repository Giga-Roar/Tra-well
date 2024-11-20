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
    check_out_date date,
    total_amount int NOT NULL,
    phone_number varchar(14) NOT NULL,
    booker_age int NOT NULL,
    FOREIGN KEY (hotel_id) references hotel(hotel_id)
);

CREATE TABLE rooms(
    hotel_id int NOT NULL,
    room_no int NOT NULL,
    booking_id int NOT NULL,
    PRIMARY KEY (hotel_id, room_no),
    FOREIGN KEY (hotel_id) references hotel(hotel_id),
    FOREIGN KEY (booking_id) references booking(booking_id)
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
(7, "Shivamogga Safari Lodge", "Jog Falls Road, Shivamogga, Karnataka", 3.5, 25, 3),
(8, "Mumbai Skyline Hotel", "Marine Drive, Mumbai, Maharashtra", 5, 50, 4),
(9, "Pune Heritage Inn", "Shaniwar Wada, Pune, Maharashtra", 4, 30, 5),
(10, "Nagpur Central Hotel", "Sitabuldi, Nagpur, Maharashtra", 3, 20, 6),
(11, "Delhi Palace Hotel", "Connaught Place, New Delhi, Delhi NCR", 4.5, 45, 7),
(12, "Ahmedabad Heritage", "Sabarmati Ashram Road, Ahmedabad, Gujarat", 4, 35, 8),
(13, "Gandhinagar Lake View", "Sarkhej-Gandhinagar Highway, Gandhinagar, Gujarat", 3.5, 25, 9),
(14, "Vadodara Royal Palace", "Laxmi Vilas Palace Road, Vadodara, Gujarat", 5, 50, 10),
(15, "Dwarka Beach Resort", "Dwarka Beach, Dwarka, Gujarat", 4, 40, 11),
(16, "Mysore Palace View", "Mysore Palace, Mysore, Karnataka", 4.5, 35, 12),
(17, "Kolkata Heritage", "Park Street, Kolkata, West Bengal", 4, 30, 13),
(18, "Darjeeling Himalayan View", "Mall Road, Darjeeling, West Bengal", 3.5, 25, 14),
(19, "Bengaluru Tech Park Inn", "Whitefield, Bengaluru, Karnataka", 4, 40, 1),
(20, "Mangalore Spice Hotel", "Kudla, Mangaluru, Karnataka", 3, 30, 2),
(21, "Shivamogga Forest Lodge", "Bhadra Wildlife Sanctuary, Shivamogga, Karnataka", 4.5, 35, 3),
(22, "Mumbai Gateway Hotel", "Colaba Causeway, Mumbai, Maharashtra", 5, 50, 4),
(23, "Pune IT Park Hotel", "Hinjewadi, Pune, Maharashtra", 4, 40, 5),
(24, "Nagpur Orange City Hotel", "Sadar, Nagpur, Maharashtra", 3.5, 35, 6);

INSERT INTO host_credentials VALUES
("host1", "pass123", 1),
("host2", "pass123", 3),
("host3", "pass123", 2),
("host4", "pass123", 4),
("host5", "pass123", 5),
("host6", "pass123", 6),
("host7", "pass123", 7),
("host8", "pass123", 8),
("host9", "pass123", 9),
("host10", "pass123", 10),
("host11", "pass123", 11),
("host12", "pass123",12),
("host13", "pass123",13),
("host14", "pass123",14),
("host15", "pass123",15),
("host16", "pass123",16),
("host17", "pass123",17),
("host18", "pass123",18),
("host19", "pass123",19),
("host20", "pass123",20),
("host21", "pass123",21),
("host22", "pass123",22),
("host23", "pass123",23),
("host24", "pass123",24);

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
CREATE PROCEDURE del_book(IN selected_booking_id INT)
BEGIN
    DELETE FROM rooms WHERE booking_id = selected_booking_id;
    DELETE FROM booking WHERE booking_id = selected_booking_id;
END
$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE del_book_above(IN lower_limit INT)
BEGIN
    DELETE FROM rooms WHERE booking_id > lower_limit;
    DELETE FROM booking WHERE booking_id > lower_limit;
END
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
