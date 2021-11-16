require("dotenv").config();
const express = require("express");

const cors = require("cors");

const morgan = require("morgan");

const db = require("./db");

const app = express();

app.use(cors())

app.use(express.json());

//get all restaurants
app.get("/api/v1/restaurants",async (req,res) => {
    try 
    {
        const results = await db.query("SELECT * FROM restaurants");
        //console.log(results);
        //sending response back
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data:
            {
                restaurants: results.rows,
                //reataurant: ["McDonalds","Hesburger","BurgerKing"],
            },
        });
    } 
    catch(err) 
    {
        console.log(err);
    }
});

//http://localhost:3001/api/v1/restaurants
//get a restuarant
app.get("/api/v1/restaurants/:id",async (req,res) => {
    console.log(req.params.id);
    try
    {
        const results = await db.query(
            "SELECT * FROM restaurants WHERE id = $1",[req.params.id]);
        //console.log(results.rows[0]);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurants: results.rows[0],
            },
        });

    }
    catch(err)
    {
        console.log(err);
    }
});

//Create a Reataurant
app.post("/api/v1/restaurants",async (req,res) => {
    //console.log(req.body);
    try
    {
        const results = await db.query("INSERT INTO restaurants (name,location,price_range) values ($1,$2,$3) returning *",
        [req.body.name, req.body.location, req.body.price_range]);
        //console.log(results);
        res.status(201).json(
        {
            status: "success",
            data: 
            {
                restaurants: results.rows[0],
            },
        });

    }
    catch(err)
    {
        console.log(err);
    }
    
});

//Update Restaurants
app.put("/api/v1/restaurants/:id",async (req,res)=> {
    //console.log(req.params.id);
    //console.log(req.body);
    const results = await db.query("UPDATE restaurants SET name = $1,location = $2, price_range = $3 WHERE id = $4 returning *",
    [req.body.name, req.body.location, req.body.price_range, req.params.id]);
    console.log(results);
    try
    {
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            },
        });

    }
    catch(err)
    {
        console.log(err);
    }
});

//Delete Restaurant
app.delete("/api/v1/restaurants/:id",async (req,res)=>{
    //console.log(req.params.id);
    try
    {
        const results = await db.query("DELETE FROM restaurants WHERE id = $1",[req.params.id]);
        res.status(204).json({
            status: "success"
        });
    }
    catch(err)
    {
        console.log(err);
    }
});
const port = 3001;
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
});