import React, { useState, useContext } from 'react';
import { useLocation, useParams ,useNavigate} from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

export const AddReview = () => {

    const {id} = useParams();

    const [name, setName] = useState("");
    const [rating, setRating] = useState("Rating");
    const [review, setReview] = useState("");

    let navigate = useNavigate();
    let location = useLocation();
    
    let { from } = location.pathname;
    //console.log(location.key);
    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try{
            const newReview = await RestaurantFinder.post(`/${id}/addReview`,{
                name,
                rating,
                review
            });
            navigate("/");
            navigate(`/restaurants/${id}`);
           
            //console.log(newReview);

        }catch(err){
            console.log(err);
        }
        
    }


    return (
        <div className="mb-2">
            <form action="post" >
                
                <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="name">Name</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} className="form-control" id="name" placeholder="Name"/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="rating">Rating</label>
                            <select id="rating" className="custom-select"
                                value={rating} onChange={e => setRating(e.target.value)}>
                                <option disabled>Rating</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                    </div>
                <div className="form-group">
                    <label htmlFor="review">Review</label>
                    <textarea value={review} onChange={e => setReview(e.target.value)} id="Review" className="form-control"></textarea>
                </div>
                <button onClick={handleSubmitReview} className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    )
}
export default AddReview;