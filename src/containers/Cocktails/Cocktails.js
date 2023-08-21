import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";

import { Typography, Grid, Button } from "@mui/material";

import { cocktailsGetItems } from "../../store/actions/cocktailsActions";
import CocktailItem from "./CocktailItem";
import Spinner from "../../components/UI/Spinner/Spinner";

const Cocktails = ({ user }) => {
    const dispatch = useDispatch();

    const { cocktails, loading, error } = useSelector(state => state.cocktails, shallowEqual);

    useEffect(() => {
        dispatch(cocktailsGetItems());
    }, [dispatch]);

    useEffect(() => {
        if (error !== null) console.log("Error with request: ", error);
    }, [error]);

    useEffect(() => {
        console.log("cocktails", cocktails);
    }, [cocktails]);


    // =========================================================
    if (loading) return (<Spinner />);
    else
        return (
            <Grid container direction="column" spacing={2}>
                <Grid item container direction="row" justify="space-between" alignItems="center" spacing={2}>
                    <Grid item>
                        <Typography variant="h4">
                            Cocktails
                        </Typography>
                    </Grid>
                    {
                        user && <Grid item>
                            <Button variant="contained" component={Link} to="/cocktails/add-cocktail">
                                Add new cocktail
                            </Button>
                        </Grid>
                    }

                    <Grid item container direction="row" spacing={1}>
                        {cocktails.map(cocktail => (
                            <CocktailItem
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

export default Cocktails