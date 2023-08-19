import React from "react";
import { NavLink } from "react-router-dom";

import Button from "@mui/material/Button";

const AnonymousMenu = () => {
    return (
        <Button component={NavLink} to="/login" color="inherit">Sign In</Button>
    );
};

export default AnonymousMenu;