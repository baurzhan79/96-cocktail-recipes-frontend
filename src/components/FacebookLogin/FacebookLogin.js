import React from "react";
import { useDispatch } from "react-redux";

import FacebookLoginButton from "react-facebook-login/dist/facebook-login-render-props";
import { Button } from "@mui/material";

import { facebookAppId } from "../../config";
import { facebookLogin } from "../../store/actions/usersActions";

const FacebookLoginComponent = () => {
    const dispatch = useDispatch();

    const facebookResponse = response => {
        const data = { ...response };
        data.avatar = response.picture.data.url;

        if (response.id) {
            dispatch(facebookLogin(data));
        }
    };

    return (
        <FacebookLoginButton
            appId={facebookAppId}
            fields="name,email,picture"
            render={renderProps => (
                <Button onClick={renderProps.onClick}>
                    Enter with Facebook
                </Button>
            )}
            callback={facebookResponse}
        />
    )
}

export default FacebookLoginComponent