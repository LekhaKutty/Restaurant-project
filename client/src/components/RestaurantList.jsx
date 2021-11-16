import React, {useEffect, useContext} from 'react';
import {useNavigate} from "react-router-dom";
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const RestaurantList = (props) => {
    const {restaurants, setRestaurants} = useContext(RestaurantsContext);
    let navigate = useNavigate();

    useEffect(() => {
        const fetchDataUpdate = async () => {
            try{
                const response = await RestaurantFinder.get("/");
                setRestaurants(response.data.data.restaurants)
                console.log(response);
            }catch(err){
                console.log(err);
            }
        }
        fetchDataUpdate();
    },[]);
    //function calling while click on Delete button
    const handleDelete = async (id) => {
        //console.log(id);
        try{
            const response = await RestaurantFinder.delete(`/${id}`);
            //console.log(response);
            //deleting from display
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id
            }))
        } catch (err) {
            console.log(err);
        }
    }
    //function calling while clicking on Update button
    const handleUpdate = async (id) => {
        console.log(id)
        try{
            //direct to update page
            navigate(`/restaurants/${id}/update`)
            const response = await RestaurantFinder.put(`/${id}`);

        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className = "list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="big-primary">
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                       restaurants && restaurants.map(restaurant => {
                        return(
                            <tr key={restaurant.id}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.location}</td>
                                <td>{"$".repeat(restaurant.price_range)}</td>
                                <td>reviews</td>
                                <td><button onClick={() => handleUpdate(restaurant.id)} className="btn btn-warning">Update</button></td>
                                <td><button onClick={() => handleDelete(restaurant.id)} className="btn btn-danger">Delete</button></td>
                            </tr>
                        )
                        
                    })}
                </tbody>
            </table>
            
        </div>
    )
}
export default RestaurantList