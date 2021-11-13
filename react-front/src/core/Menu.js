import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

const isActive = (history, path) => {
    if(history.location.pathname === path) return{color: "#cc00cc"}
    else return {color: "#0059b3"}
};





const Menu = ({history}) => (
    <div>
        <ul className="nav nav-tabs nav-justified mb-3 bg-info">
            <li className="nav-item" >
                <Link className="nav-link" style={isActive(history, "/")} to="/">Home</Link>
            </li>
             {!isAuthenticated() && (
                 <>
                 <li className="nav-item" >
                 <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">SignUp</Link>
             </li>
             <li className="nav-item" >
                 <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">SignIn</Link>
             </li>
             </>
             )}
            {isAuthenticated() && (
                <>
                <li className="nav-item" >
                <Link className="nav-link" style={isActive(history, `/user/${isAuthenticated().user._id}`)} to={`/user/${isAuthenticated().user._id}`}>
                {`${isAuthenticated().user.name}'s profile`}
                </Link>
                
            </li>
                <li className="nav-item" >
                <a className="nav-link" style={isActive(history, ""), {cursor: "pointer", color: "#0059b3" }} 
                onClick={() => signout(() => history.push('/'))} >LogOUT</a>
            </li>
            </>
            )}
       
        </ul>
    </div>
);

export default withRouter(Menu) ;

