import React from "react";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./routes/Home";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import UpdatePage from "./routes/UpdatePage";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";

const App = () => {
    return(
        <RestaurantsContextProvider>
            <div className="container">
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
                        <Route path="/restaurants/:id/update" element={<UpdatePage />} />
                    </Routes>
                </Router>
            </div>
        </RestaurantsContextProvider>
        
    ) 
}

export default App;