import express from 'express'
import {getHotels, devQuery, book, getAllBookings, getHotelsIdName, getCities, getNumRooms, login, getCheckedRooms, getFullRoomDetails, unBookRoom} from './database.mjs';
import readline  from 'readline';
import cors from "cors";


const app = express();
app.use(express.json());

app.use(cors({
    origin: `${process.env.FRONTEND_URL}`, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.post("/login/:user_name/:password", async (req, res) => {
    const userName = req.params.user_name;
    const password = req.params.password;
    const loginDetails = await login(userName, password);
    res.send(loginDetails);
})

app.get("/checked-rooms/:hotel_id", async (req, res) => {
    const hotel_id = req.params.hotel_id;
    const checkedRooms = await getCheckedRooms(hotel_id);
    res.send(checkedRooms);
})

app.get("/full-room-details/:hotel_id", async(req, res) => {
    const hotel_id = req.params.hotel_id;
    const roomDetails = await getFullRoomDetails(hotel_id);
    res.send(roomDetails);
})

app.post("/booking-data", async (req, res) => {
    try{
        const data = req.body;
        await book(data);
        res.send(data);
    }
    catch (e) {
        res.send("Age must be above 18");
    }
})

app.post('/unbook-rooms/:hotel_id', async (req, res) =>{
    const hotel_id = req.params.hotel_id;
    try{
        const data = req.body;
        const unBookResult = await unBookRoom(hotel_id, data);
        res.send(unBookResult);
    }
    catch (e) {
        console.error(e);
    }
});

app.get("/booked", async (req, res) => {
    const totalBookings = await getAllBookings();
    res.send(totalBookings);
})
app.get("/hotels/:city/:min_rating?/:max_rating?", async (req, res) => {
    const city = req.params.city;
    const min_rating = parseInt(req.params.min_rating);
    const max_rating = parseInt(req.params.max_rating);
    var hotels = ""

    if(city == "any"){
        hotels = await getHotels(city = flase, min_rating=min_rating, max_rating=max_rating);
    }
    else{
        hotels = await getHotels(city, min_rating, max_rating);
    }
    if(hotels.length == 0){
        res.send("Data unavailable");
    }
    else{
        res.send(hotels);
    }
})


app.get("/cities", async (req, res) => {
    const cities = await getCities();
    res.send(cities);
})


app.get("/hotelsInCity/:cityId", async (req, res) => {
    const selected_city_id = parseInt(req.params.cityId);
    const hotels = await getHotels(null, 0, 5, selected_city_id);
    // console.log(hotels);
    res.send(hotels);
})



app.get("/number-of-rooms/:hotel_id", async (req, res) => {
    const hotelID = parseInt(req.params.hotel_id) || 1
    const numRooms = await getNumRooms(hotelID); 
    res.send(""+numRooms);
});


app.get("/hotels/:city", async (req, res) =>{
    const hotels = await getHotels(city, 0, 5);
    res.send(hotels);
})


app.get("/hotels", async (req, res) =>{
    const hotels = await getHotels(false, 0, 5);
    res.send(hotels);
})


app.get("/dev/query", async (req, res) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      
      });
      
    rl.question("> ", async (query) => {
        const result = await devQuery(query);
        res.send(result);
    ;
    rl.close();
  
  });
    
})


app.get("/", async (req, res) => {
    res.send("home page");
    console.log("Hello there");
})

app.use((err, req, res, next) =>{
    console.error(err.stack);
    res.status(500).send("something broke!");
}
);

app.listen(5000, ()=>{
    console.log('Server is running on port 5000');
})
