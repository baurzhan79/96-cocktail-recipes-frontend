import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { Grid, Typography, Rating } from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

import imageNotAvailable from "../../assets/images/image_not_available.png";
import { apiURL } from "../../config";
import { getCocktail, updateCocktail } from "../../store/actions/cocktailsActions";
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

const CocktailCard = ({ user }) => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user === null) navigate("/");
    }, [user, navigate]);

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
    const [ratings, setRatings] = useState([]);
    const [avgRating, setAvgRating] = useState(0);
    const [userRating, setUserRating] = useState(0);
    const [isChangedUserRating, setIsChangedUserRating] = useState(false);

    useEffect(() => {
        if (selectedCocktail !== null) {
            const ingredientsCocktail = JSON.parse(selectedCocktail.ingredients);
            setIngredients(ingredientsCocktail);

            const ratingsCocktail = JSON.parse(selectedCocktail.ratings);
            setRatings(ratingsCocktail);
        }
    }, [selectedCocktail]);

    useEffect(() => {
        if (ratings.length > 0) {
            const ratingsSum = ratings.reduce((sum, currentItem) => {
                if (currentItem.user === user._id) setUserRating(currentItem.rating);
                return sum + currentItem.rating;
            }, 0);

            let result = ratingsSum / ratings.length;
            result = Math.round(result * 10) / 10;
            setAvgRating(result);
        }
        else setAvgRating(0);
    }, [ratings]);

    useEffect(() => {
        if (userRating > 0 && isChangedUserRating) {
            const filteredArray = ratings.filter(item => {
                return item.user === user._id;
            });

            const newRatings = [...ratings];

            if (filteredArray.length === 1) {
                newRatings.forEach(element => {
                    if (element.user === user._id) element.rating = userRating;
                });
            }
            else {
                newRatings.push(
                    {
                        user: user._id,
                        rating: userRating
                    }
                );
            }

            dispatch(updateCocktail(selectedCocktail._id, newRatings));
            setIsChangedUserRating(false);
        }
    }, [userRating]);


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
                    <Grid item sm={6}>
                        <Img alt="cocktail image" src={cardImage} />
                    </Grid>
                    <Grid item sm={6}>
                        <Typography variant="h4">
                            {selectedCocktail.title}
                        </Typography>

                        {
                            ratings.length > 0 ?
                                <Typography variant="h5">
                                    Ratings: {avgRating} ({ratings.length} {ratings.length > 1 ? "votes" : "vote"})
                                </Typography>
                                : null
                        }

                        <Typography variant="h5">
                            Ingredients:
                        </Typography>
                        <Typography variant="h6">
                            <ul className={classes.ul}>
                                {ingredients.map((ingredient, index) => (
                                    <li key={index}>
                                        {ingredient.name} - {ingredient.amount}
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

                <Grid item sx={{ my: 2 }}>
                    <Typography component="legend">Rate</Typography>
                    <Rating
                        name="userRating"
                        value={userRating}
                        onChange={(event, newValue) => {
                            if (newValue > 0) {
                                setUserRating(newValue);
                                setIsChangedUserRating(true);
                            }
                        }}
                    />
                </Grid>
            </Grid>
        );
};

export default CocktailCard;