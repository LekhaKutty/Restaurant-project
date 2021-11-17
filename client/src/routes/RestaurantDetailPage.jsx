import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRating';
import { RestaurantsContext } from '../context/RestaurantsContext';

const RestaurantDetailPage = () => {

    const {id} = useParams();

    const [selectedRestaurants, setSelectedRestaurants] = useState("");
    
    useEffect(() => {
        const fetchEachRestaurantData = async () => {
            try{
                const response = await RestaurantFinder.get(`/${id}`);
                //console.log(response.data);
                setSelectedRestaurants(response.data.data);
                
            }catch(err){
                console.log(err);
            }
        }
        fetchEachRestaurantData()
    },[]);


    return (
        <div>
            {
                selectedRestaurants && (
                <>
                    <br/>
                    <h1 className="font-weight-light disply-1 text-center">{selectedRestaurants.restaurants.name}</h1>
                    <br/>
                    <div className="mt-3">
                        <Reviews reviews={selectedRestaurants.reviews}/>
                    </div>
                    <div className="mt-3">
                    <AddReview />
                    </div>
                </>
            )}
        </div>
    )
}
export default RestaurantDetailPage