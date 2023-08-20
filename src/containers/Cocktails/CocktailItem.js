import React from "react";
import { Link } from "react-router-dom";

import { Grid, Card, CardHeader, CardContent, CardActions, IconButton, CardMedia, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";

import imageNotAvailable from "../../assets/images/image_not_available.png";
import { apiURL } from "../../config";

const useStyles = makeStyles({
    card: {
        height: '100%'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    pos: {
        marginTop: 12,
    },
});

const CocktailItem = ({ id, title, image, published, author }) => {
    const classes = useStyles();
    let cardImage = imageNotAvailable;
    if (image) {
        cardImage = apiURL + "/uploads/" + image;
    }

    const deleteCocktailHandler = () => {
        console.log("delete cocktail button clicked, id", id);
    }

    return (
        <Grid item xs={12} sm={12} md={6} lg={4}>
            <Card className={classes.card}>
                <CardHeader title={title} />
                <CardMedia
                    image={cardImage}
                    title={title}
                    className={classes.media}
                />
                <CardContent>
                    <strong>
                        status: {published ? "Published" : "Unpublished"}
                    </strong>
                    <Typography className={classes.pos} color="textSecondary">
                        author: {author}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton component={Link} to={"/cocktails/" + id}>
                        <ArrowForwardIcon />
                    </IconButton>
                    <IconButton onClick={deleteCocktailHandler}>
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

CocktailItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    published: PropTypes.bool.isRequired,
    image: PropTypes.string,
    author: PropTypes.string
};

export default CocktailItem;