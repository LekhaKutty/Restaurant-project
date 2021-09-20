require("dotenv").config();
const express = require("express");

const app = express();
//get all restaurants
app.get("/api/v1/restaurants", (req,res) => {
    res.status(200).json({
        status: "success",
        data:{
           reataurant: ["McDonalds","Hesburger","BurgerKing"],
        }
    });
});
//http://localhost:3001/api/v1/restaurants
//get a restuarant
app.get("/api/v1/restaurants/:restaurantid", (req,res) => {
    console.log(req.params);
});
//Create a Reataurant
app.post("/api/v1/restaurants",(req,res) => {
    console.log(req);
});
console.log("get restart");
const port = 3001;

app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
});