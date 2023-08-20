import React from "react";
import { Link } from "react-router-dom";

import { Typography, Grid, Button } from "@mui/material";

const Cocktails = ({ user }) => {
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
            </Grid>
        </Grid>
    )
}

export default Cocktails