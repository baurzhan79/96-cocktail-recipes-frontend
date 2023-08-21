import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

import imageNotAvailable from "../../assets/images/image_not_available.png";
import { apiURL } from "../../config";
import { getCocktail } from "../../store/actions/cocktailsActions";
import Spinner from "../UI/Spinner/Spinner";

const useStyles = makeStyles({
    ul: {
        margin: 0
    }
});

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const CocktailCard = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (params.cocktailId !== undefined) dispatch(getCocktail(params.cocktailId));
    }, [params.cocktailId, dispatch])

    const { selectedCocktail, loading, error } = useSelector(state => state.cocktails, shallowEqual);

    useEffect(() => {
        if (error !== null) {
            console.log("Error with request: ", error);
            navigate("/");
        }
    }, [error, navigate]);


    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        console.log("selectedCocktail", selectedCocktail);
        if (selectedCocktail !== null) {
            const ingredientsCocktail = JSON.parse(selectedCocktail.ingredients);
            setIngredients(ingredientsCocktail);
        }
    }, [selectedCocktail]);


    const classes = useStyles();
    let cardImage = imageNotAvailable;
    if (selectedCocktail !== null && selectedCocktail.image) {
        cardImage = apiURL + "/uploads/" + selectedCocktail.image;
    }

    // =========================================================
    if (loading || selectedCocktail === null) return (<Spinner />);
    else
        return (
            <Grid container direction="column" spacing={2}>
                <Grid item container direction="row" justify="space-between" alignItems="center" spacing={2}>
                    <Grid item>
                        <Img alt="cocktail image" src={cardImage} />
                    </Grid>
                    <Grid item>
                        <Typography variant="h4">
                            {selectedCocktail.title}
                        </Typography>
                        <Typography variant="h5">
                            Ingredients:
                        </Typography>
                        <Typography variant="h6">
                            <ul className={classes.ul}>
                                {ingredients.map(ingredient => (
                                    <li>
                                        {ingredient.name} - {ingredient.count}
                                    </li>
                                ))}
                            </ul>
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item>
                    <Typography variant="h5">
                        Recipe:
                    </Typography>
                    <Typography variant="body1">
                        {selectedCocktail.recipe}
                    </Typography>
                </Grid>
            </Grid>
        );
};

export default CocktailCard;