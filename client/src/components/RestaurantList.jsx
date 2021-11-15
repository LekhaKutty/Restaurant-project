import React from 'react';

const RestaurantList = () => {

    return (
        <div className = "list-group">
            <table class="table table-hover table-dark">
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
                    <tr>
                        <td>mcdonals</td>
                        <td>Finland</td>
                        <td>$$</td>
                        <td>Rating</td>
                        <td><button className="btn btn-warning">Update</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
            
                    </tr>
                    <tr>
                        <td>mcdonals</td>
                        <td>Finland</td>
                        <td>$$</td>
                        <td>Rating</td>
                        <td><button className="btn btn-warning">Update</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
            
                    </tr>
                </tbody>
            </table>
            
        </div>
    )
}
export default RestaurantList