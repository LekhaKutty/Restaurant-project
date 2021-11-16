import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import StarRating from '../components/StarRating';
import { RestaurantsContext } from '../context/RestaurantsContext';

const RestaurantDetailPage = () => {

    const {id} = useParams();

    const [selectedRestaurants, setSelectedRestaurants] = useState("");
    
    useEffect(() => {
        const fetchEachRestaurantData = async () => {
            try{
                const response = await RestaurantFinder.get(`/${id}`);
                console.log(response.data.data);
                setSelectedRestaurants(response.data.data.restaurants);
                
            }catch(err){
                console.log(err);
            }
        }
        fetchEachRestaurantData()
    },[]);


    return (
        <div>
            <h1 className="text-center">{selectedRestaurants && <StarRating rating={2.7}/>}</h1>
            
        </div>
    )
}
export default RestaurantDetailPage