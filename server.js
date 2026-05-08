const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static("public"));

let seats = [];

for(let i=1;i<=50;i++){
    seats.push({
        id:i,
        number:i,
        status:"free"
    });
}

app.get("/api/seats",(req,res)=>{
    res.json(seats);
});

app.post("/api/book/:id",(req,res)=>{

    const seat = seats.find(s=>s.id == req.params.id);

    if(!seat){
        return res.json({message:"Seat not found"});
    }

    if(seat.status === "booked"){
        return res.json({message:"Seat already booked"});
    }

    seat.status = "booked";

    res.json({message:"Seat booked successfully"});
});

app.listen(3000,()=>{
    console.log("Server running on http://localhost:3000");
});
