export function navigateWithAuth(
    navigate,
    isAuthenticated,
    protectedRoute
){

    if(isAuthenticated){

        navigate(protectedRoute);

    }

    else{

        navigate("/login");

    }

}

export function navigateGetStarted(
    navigate,
    isAuthenticated
){

    if(isAuthenticated){

        navigate("/dashboard");

    }

    else{

        navigate("/register");

    }

}