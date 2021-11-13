import React , {Component} from 'react';
import { signup } from '../auth';

class Signup extends Component{

    constructor(){
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false
        }

    }

    handleChange = (name) => (event) => {
        this.setState({error:""}) ;
        this.setState({[name]: event.target.value});

    };

    clickSubmit = event => {
        event.preventDefault() ;
        const {name, email, password} = this.state ;
        const user = {
            name ,
            email,
            password

        };
        signup(user).then(data => {
            if(data.error) this.setState({error: data.error})
                else this.setState({
                    error: "",
                    name: "",
                    email: "",
                    password: "",
                    open: true
                });
        });
    };

    

    signupForm = (name, email, password) => (
        <form>
                
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input onChange={this.handleChange("name")} 
                        type="text" 
                        value={name}
                        className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input onChange={this.handleChange("email")} 
                        type="email"
                        value={email}
                         className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input onChange={this.handleChange("password")} 
                        type="password" 
                        value={password}
                        className="form-control"/>
                    </div>
                    <br/>
                    <div>
                    <button onClick={this.clickSubmit} className="btn btn-info btn-rounded">Submit</button>
                    </div>
                </form>
    );

    render() {
        const {name, email, password, error, open} = this.state ;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>

                
                <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                    {error}
                </div>

                <div className="alert alert-success" style={{display: open ? "" : "none"}}>
                    New account is succesfully created. Please SignIn
                </div>

                {this.signupForm(name, email, password)}
            
            </div>
        );
    }
}

export default Signup ;