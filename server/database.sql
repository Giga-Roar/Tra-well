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
(4, "Ocean Pearl", "Navabharath Cir, Kodailbail, Mangaluru, Karnataka 575003", 4, 40, 2);

INSERT INTO host_credentials VALUES
("RohitSharma45", "whatapav123", 1),
("DarshanThoogudeepa6106", "Jalagara", 3),
("SanjivP00ri", "NoAttacking", 2);

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


