import React, {useEffect, useContext} from 'react';
import {useNavigate} from "react-router-dom";
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import StarRating from './StarRating';

const RestaurantList = (props) => {
    const {restaurants, setRestaurants} = useContext(RestaurantsContext);
    let navigate = useNavigate();

    useEffect(() => {
        const fetchDataUpdate = async () => {
            try{
                const response = await RestaurantFinder.get("/");
                setRestaurants(response.data.data.restaurants)
                console.log(response.data.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchDataUpdate();
    },[]);
    //function calling while click on Delete button
    const handleDelete = async (e, id) => {
        //console.log(id);
        e.stopPropagation();
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
    const handleUpdate = async (e, id) => {
        console.log(id);
        e.stopPropagation();
        try{
            //direct to update page
            navigate(`/restaurants/${id}/update`)
            const response = await RestaurantFinder.put(`/${id}`);

        } catch(err) {
            console.log(err);
        }
    }
    //function calling while clicking on each row
    const handleRestaurantSelect = async (id) => {
        console.log(id);
        try{
            navigate(`/restaurants/${id}`);
        }catch(err){
            console.log(err);
        }
    }

    const renderRating = (restaurant) => {
        if(!restaurant.count){
            return <span className="text-warning ml-1">0 reviews</span>
        }
        return(
            <>
                <StarRating rating={restaurant.average_rating}/>
                <span className="text-warning ml-1">({restaurant.count})</span>
            </>
        )
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
                            <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.location}</td>
                                <td>{"$".repeat(restaurant.price_range)}</td>
                                <td>{renderRating(restaurant)}</td>
                                <td><button onClick={(e) => handleUpdate(e, restaurant.id)} className="btn btn-warning">Update</button></td>
                                <td><button onClick={(e) => handleDelete(e, restaurant.id)} className="btn btn-danger">Delete</button></td>
                            </tr>
                        )
                        
                    })}
                </tbody>
            </table>
            
        </div>
    )
}
export default RestaurantList