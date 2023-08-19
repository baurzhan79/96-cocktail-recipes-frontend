import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { CssBaseline, Container } from "@mui/material";

import FacebookLogin from "../../components/FacebookLogin/FacebookLogin";

const Login = ({ isAllowed }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAllowed) navigate("/");
    }, [isAllowed, navigate])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <FacebookLogin />
        </Container>
    );
}

export default Login;