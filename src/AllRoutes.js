import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./containers/User/Login";
import Cocktails from "./containers/Cocktails/Cocktails";
import CocktailCard from "./components/CocktailCard/CocktailCard";
import AddCocktail from "./containers/AddCocktail/AddCocktail";
import UserCocktails from "./containers/UserCocktails/UserCocktails";

const AllRoutes = ({ user }) => {
    return (
        <Routes>
            <Route path="/" element={<Cocktails user={user} />} />
            <Route path="/cocktails/:cocktailId" element={<CocktailCard user={user} />} />
            <Route path="/cocktails/add-cocktail" element={<AddCocktail user={user} />} />
            <Route path="/mycocktails" element={<UserCocktails user={user} />} />
            <Route path="/login" element={<Login isAllowed={!user} />} />
            <Route path="*" element={<h3 style={{ textAlign: "center" }}>Page not found</h3>} />
        </Routes>
    )
}

export default AllRoutes