import React, {useState, useContext, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
//import { RestaurantsContext } from '../context/RestaurantsContext';
import {useNavigate} from "react-router-dom";

const UpdateRestaurant = () => {

    let navigate = useNavigate();
    const {id} = useParams();
    //console.log(id);
    //const {restaurants} = useContext(RestaurantsContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await RestaurantFinder.get(`/${id}`);
                //console.log(response.data.data);
                setName(response.data.data.restaurants.name);
                setLocation(response.data.data.restaurants.location);
                setPriceRange(response.data.data.restaurants.price_range);
            }catch(err){
                console.log(err);
            }
            
        }
        fetchData();
    },[]);

    const handleUpdateSubmit =async (e) =>{
        e.preventDefault()
        try { 
                const updatedRestaurant = await RestaurantFinder.put(`/${id}`,{
                name: name,
                location: location,
                price_range:priceRange
            });
            console.log(updatedRestaurant);
            navigate("/");
        }catch(err) {
            console.log(err)
        }
        
    }
    return (
        <div>
            <form onSubmit={handleUpdateSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} id="name" className="form-control" type="text" />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input value={location} onChange={e => setLocation(e.target.value)} id="location" className="form-control" type="text" />
                </div>
                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <input value={priceRange} onChange={e => setPriceRange(e.target.value)} id="price_range" className="form-control" type="number" />
                </div>
                <button type='submit' className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
export default UpdateRestaurant;