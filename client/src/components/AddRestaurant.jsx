import React, { useState, useContext } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddRestaurant = () => {

    const {addRestaurants} = useContext(RestaurantsContext);

    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [priceRange, setPriceRange] = useState("Price range")
   
    const handleSubmit =async (e) => {
        e.preventDefault();
        //console.log("err");
        try {
            const response = await RestaurantFinder.post("/",{
                name: name,
                location: location,
                price_range: priceRange,

            })
            console.log(response.data.data.restaurants);
            addRestaurants(response.data.data.restaurants);
        } catch(err) {
            console.log(err)
        }
    }
    return (
        <div className="mb-4">
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="col">
                        <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="name"/>
                    </div>
                    <div className="col">
                        <input value={location} onChange={e => setLocation(e.target.value)} type="text" className="form-control" placeholder="location"/>
                    </div>
                    <div className="col">
                        <select className="custom-select my-1 mr-sm-2"
                            value={priceRange} onChange={e => setPriceRange(e.target.value)} >
                            <option>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>                         
                        </select>
                    </div>
                    
                    <button type="submit" className="btn-primary">ADD</button>
                </div>
            </form>
        </div>
    )
}
export default AddRestaurant