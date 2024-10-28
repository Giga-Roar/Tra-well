import express from 'express'
import {getHotels, devQuery} from './database.js';
import readline  from 'readline';



const app = express();
app.use(express.json());


// app.post("/notes", (req, res) => {
//     const {title, contents}  = req.body;
//     const note = insertNote(title, contents);
//     res.status(201).send(note);
// })


app.get("/hotels/:city/:min_rating?/:max_rating?", async (req, res) => {
    const city = req.params.city;
    const min_rating = req.params.min_rating;
    const max_rating = req.params.max_rating;
    var hotels = ""

    if(city == "any"){
        // res.send("Sus");
        hotels = await getHotels(city = flase, min_rating=min_rating, max_rating=max_rating);
        // console.log(hotels);
    }
    else{
        hotels = await getHotels(city, min_rating, max_rating);
    }

    if(!hotels){
        res.send("Data unavailable");
    }
    else{
        res.send(hotels);
    }
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


app.use((err, req, res, next) =>{
    console.error(err.stack);
    res.status(500).send("something broke!");
}
);

app.get("/", async (req, res) => {
    console.log("Hello there");
})

app.listen(5000, ()=>{
    console.log('Server is running on port 5000');
})
