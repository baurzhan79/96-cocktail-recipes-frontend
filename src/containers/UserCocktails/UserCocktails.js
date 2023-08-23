import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Typography, Grid } from "@mui/material";

import { userCocktailsGetItems } from "../../store/actions/cocktailsActions";
import UserCocktailItem from "./UserCocktailItem";
import Spinner from "../../components/UI/Spinner/Spinner";

const UserCocktails = ({ user }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user === null) navigate("/");
    }, [user, navigate]);

    const { userCocktails, loading, error } = useSelector(state => state.cocktails, shallowEqual);

    useEffect(() => {
        dispatch(userCocktailsGetItems(user._id));
    }, [dispatch, user._id]);

    useEffect(() => {
        if (error !== null) console.log("Error with request: ", error);
    }, [error]);


    // =========================================================
    if (loading) return (<Spinner />);
    else
        return (
            <Grid container direction="column" spacing={2}>
                <Grid item container direction="row" justify="space-between" alignItems="center" spacing={2}>
                    <Grid item>
                        <Typography variant="h4">
                            My cocktails
                        </Typography>
                    </Grid>

                    <Grid item container direction="row" spacing={1}>
                        {userCocktails.map(cocktail => (
                            <UserCocktailItem
                                key={cocktail._id}
                                id={cocktail._id}
                                title={cocktail.title}
                                image={cocktail.image}
                                published={cocktail.published}
                                author={cocktail.user.displayName}
                            />
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        )
}

export default UserCocktails