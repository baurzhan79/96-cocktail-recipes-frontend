import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button, Menu, MenuItem } from "@mui/material";

import { logoutUser } from "../../../../store/actions/usersActions";

const UserMenu = ({ user }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch();
    const logout = () => {
        dispatch(logoutUser());
    };

    const navigate = useNavigate();

    const userCocktailsHandler = () => {
        navigate("/mycocktails");
        setAnchorEl(null);
    }

    return (
        <>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
            >
                Welcome, {user.displayName}
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={userCocktailsHandler}>My cocktails</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;