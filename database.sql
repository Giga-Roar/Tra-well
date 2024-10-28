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