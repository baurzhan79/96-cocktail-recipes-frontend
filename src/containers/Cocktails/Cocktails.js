import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Typography, Grid, Button } from "@mui/material";

import { getCocktails } from "../../store/actions/cocktailsActions";
import CocktailItem from "./CocktailItem";

const Cocktails = ({ user }) => {
    const dispatch = useDispatch();

    const cocktails = useSelector(state => state.cocktails.cocktails);

    useEffect(() => {
        dispatch(getCocktails());
        console.log("cocktails", cocktails);
    }, [dispatch]);

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