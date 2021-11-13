import {isAuthenticated} from "../auth";

export const read = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer ${isAuthenticated().token}`
        }
    })
    .then(response => {
        return response.json() ;
    })
    .catch(err => console.log(err));

};