import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./containers/User/Login";

const AllRoutes = ({ user }) => {
    return (
        <Routes>
            <Route path="/" element={<h3 style={{ textAlign: "center" }}>Main page</h3>} />
            <Route path="/login" element={<Login isAllowed={!user} />} />
            <Route path="*" element={<h3 style={{ textAlign: "center" }}>Page not found</h3>} />
        </Routes>
    )
}

export default AllRoutes