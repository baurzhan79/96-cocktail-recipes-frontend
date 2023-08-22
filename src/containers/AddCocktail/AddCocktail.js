import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Grid, Typography, TextField, InputLabel, Box, Button, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

import FileInput from "../../components/UI/Form/FileInput";

import { addNewCocktail } from "../../store/actions/cocktailsActions";

const useStyles = makeStyles({
    inputLabel: {
        marginRight: "10px",
        marginBottom: "10px"
    }
});

const AddCocktail = ({ user }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user === null) navigate("/");
    }, [user, navigate]);

    const [cocktailState, setCocktailState] = useState({
        name: "",
        recipe: "",
        image: "",
        ingredients: []
    });

    const [hasCocktailState, setHasCocktailState] = useState(false);

    useEffect(() => {
        if (cocktailState.name !== "" && cocktailState.recipe !== "" && cocktailState.ingredients.length > 0) setHasCocktailState(true);
        else setHasCocktailState(false);
    }, [cocktailState]);

    const [ingredientState, setIngredientState] = useState({
        name: "",
        amount: ""
    });

    const [hasIngredient, setHasIngredient] = useState(false);

    useEffect(() => {
        if (ingredientState.name !== "" && ingredientState.amount !== "") setHasIngredient(true);
        else setHasIngredient(false);
    }, [ingredientState]);

    const inputChangeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;
        setCocktailState(prevState => {
            return { ...prevState, [name]: value };
        });
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setCocktailState(prevState => ({
            ...prevState, [name]: file
        }));
    }

    const inputIngredientChangeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;
        setIngredientState(prevState => {
            return { ...prevState, [name]: value };
        });
    };

    const addIngredient = () => {
        const stateCopy = { ...cocktailState };
        const ingredients = [...stateCopy.ingredients];

        ingredients.push({
            name: ingredientState.name,
            amount: ingredientState.amount
        });

        stateCopy.ingredients = ingredients;
        setCocktailState(stateCopy);

        setIngredientState({
            name: "",
            amount: ""
        });
    }

    const deleteIngredientHandler = index => {
        const stateCopy = { ...cocktailState };
        const ingredients = [...stateCopy.ingredients];
        ingredients.splice(index, 1);
        stateCopy.ingredients = ingredients;
        setCocktailState(stateCopy);
    }

    const createCocktailHandler = async () => {
        console.log("create cocktail button clicked");

        const formData = new FormData();
        formData.append("user", user._id);
        formData.append("title", cocktailState.name);
        formData.append("recipe", cocktailState.recipe);
        formData.append("image", cocktailState.image);
        formData.append("published", false);

        const stateCopy = { ...cocktailState };
        const ingredients = [...stateCopy.ingredients];
        formData.append("ingredients", JSON.stringify(ingredients));

        await dispatch(addNewCocktail(formData, user.token));
        navigate("/");
    }

    const classes = useStyles();

    return (
        <Grid container direction={"column"} spacing={2} sx={{ my: 2 }}>
            <Grid item>
                <Typography variant="h6">
                    Add new cocktail
                </Typography>
            </Grid>

            <Grid item container direction="row" justify="space-between" alignItems="center">
                <Grid item xs sm={2}>
                    <InputLabel className={classes.inputLabel}>Cocktail name</InputLabel>
                </Grid>
                <Grid item xs={10} sm={8} md={6}>
                    <TextField
                        id="cocktailName"
                        variant="outlined"
                        size="small"
                        fullWidth

                        name="name"
                        value={cocktailState.name}
                        onChange={inputChangeHandler}
                    />
                </Grid>
            </Grid>

            <Grid item container direction="row" justify="space-between" alignItems="center">
                <Grid item xs sm={2}>
                    <InputLabel className={classes.inputLabel}>Add new ingredient</InputLabel>
                </Grid>
                <Grid item xs={10} sm={8} md={6} spacing={2} container direction="row" justify="space-between" alignItems="center">
                    <Grid item sm={6}>
                        <TextField
                            id="ingredientName"
                            label="Ingredient name"
                            variant="outlined"
                            size="small"
                            fullWidth

                            name="name"
                            value={ingredientState.name}
                            onChange={inputIngredientChangeHandler}
                        />
                    </Grid>
                    <Grid item sm={3}>
                        <TextField
                            id="ingredientAmount"
                            label="Amount"
                            variant="outlined"
                            size="small"
                            fullWidth

                            name="amount"
                            value={ingredientState.amount}
                            onChange={inputIngredientChangeHandler}
                        />
                    </Grid>
                    <Grid item sm={3}>
                        <Button disabled={!hasIngredient} variant="contained" onClick={addIngredient}>Add ingredient</Button>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item container direction="row" justify="space-between" alignItems="center">
                <Grid item xs={12} sm={10} md={8}>
                    <Box
                        component="fieldset"
                        sx={{
                            height: 200,
                            overflowY: "scroll",
                            border: '1px solid lightgray'
                        }}
                    >
                        <legend>Ingredients</legend>
                        <ul style={{ padding: "0", margin: "0" }}>{
                            cocktailState.ingredients.map((ingredient, index) =>
                                <li style={{ listStyle: "none" }} key={index}>
                                    <Grid item container direction="row" justify="space-between" alignItems="center">
                                        <Grid item xs={6} sm={6}>
                                            {ingredient.name}
                                        </Grid>
                                        <Grid item xs={2} sm={2}>
                                            {ingredient.amount}
                                        </Grid>
                                        <Grid item xs sm={4}>
                                            <IconButton aria-label="delete" onClick={() => deleteIngredientHandler(index)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </li>
                            )
                        }</ul>
                    </Box>
                </Grid>
            </Grid>

            <Grid item container direction="row" justify="space-between" alignItems="center">
                <Grid item xs sm={2}>
                    <InputLabel className={classes.inputLabel}>Recipe</InputLabel>
                </Grid>
                <Grid item xs={10} sm={8} md={6}>
                    <TextField
                        id="cocktailRecipe"
                        size="small"
                        multiline
                        rows={4}
                        fullWidth

                        name="recipe"
                        value={cocktailState.recipe}
                        onChange={inputChangeHandler}
                    />
                </Grid>
            </Grid>

            <Grid item container direction="row" justify="space-between" alignItems="center">
                <Grid item xs sm={2}>
                    <InputLabel className={classes.inputLabel}>Image</InputLabel>
                </Grid>
                <Grid item xs={10} sm={8} md={6}>
                    <FileInput
                        name="image"
                        onChange={fileChangeHandler}
                    />
                </Grid>
            </Grid>

            <Grid item container xs={12} sm={10} md={8} direction="row" justify="center" alignItems="center">
                <Button
                    disabled={!hasCocktailState}
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={createCocktailHandler}
                >
                    Create cocktail
                </Button>
            </Grid>
        </Grid >
    )
}

export default AddCocktail