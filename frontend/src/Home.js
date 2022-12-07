import React, { useContext } from "react";
import loginContext from "./loginContext";

const Home = () => {
    const { user } = useContext(loginContext);
    return (
        <div>
            {user
                ? <h1>Welcome Back to Jobly, {user.firstName}!</h1>
                : <h1>Welcome to Jobly!</h1>
            }
        </div>
    )
}

export default Home;
