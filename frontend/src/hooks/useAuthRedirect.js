import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

function useAuthRedirect(){

    const navigate = useNavigate();

    const {

        isAuthenticated,

    } = useContext(AuthContext);

    const redirectToProtected = (route)=>{

        if(isAuthenticated){

            navigate(route);

        }

        else{

            navigate("/login");

        }

    };

    const redirectToDashboard = ()=>{

        if(isAuthenticated){

            navigate("/dashboard");

        }

        else{

            navigate("/register");

        }

    };

    return{

        redirectToProtected,

        redirectToDashboard,

    };

}

export default useAuthRedirect;