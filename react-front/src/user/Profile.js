import React, { Component } from "react";
import {isAuthenticated} from "../auth";
import {Redirect, Link} from 'react-router-dom';
import {read} from './apiUser';


class Profile extends Component {
    constructor() {
        super()
        this.state = {
            user: "",
            redirectToSignin: false
        }
    }

    init= userId => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if(data.error) {
                this.setState({ redirectToSignin: true});
            } else {
                this.setState({ user: data});
            }
           
        });

    }


    componentDidMount() {
        const userId = this.props.match.params.userId ;
        this.init(userId);
    }
    render() {
        const {redirectToSignin, user} = this.state;
        if(redirectToSignin) return <Redirect to="/signin"/>

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
              <div className="row">
              <div className="col-md-6">
              
                <h4>Hello {user.name}</h4>
                <p>Email : {user.email}</p>
                <p>{`Joined ${new Date(user.created).toDateString()}`} </p>
              </div>
              <div className="col-md-6">
                  {isAuthenticated().user && isAuthenticated().user._id == user._id && (
                     <>
                     <div className="d-inline p-2">
                          <Link className="btn  btn-success mr-5"
                          to={`/user/edit/${user._id}`}
                          >
                              Edit Profile
                          </Link>
                          </div>
                        <div className="d-inline p-2">
                          <button className="btn  btn-danger mr-5">
                              Delete Profile
                          </button>

                      </div>
                      </>
                  )}
              </div>
              </div>
            </div>
        );
    }
};

export default Profile;