import React, { Component } from "react";
import Card from "./Cards";
import Form from "./Form";
import axios from "./axios";
import "../css/main.css"
import { connect } from "react-redux";
import { getUsers }  from "../redux/actions";

interface IUserProps {
    getUsers?: any;
  }
class App extends Component <IUserProps>{
    state = { isModal:false, userIndex: 0 };
    
    async componentDidMount(){
        const res = await axios.get('/user/getUsers/');
        if(res.status === 200){
            this.props.getUsers(res.data);
        }
    }
    onFormSubmit = async (user :any) => {
        this.setState((prevState :any) => ({
            users: [user, ...prevState.users]
        }))
    };
    
    
    render(){
    
        return(
            <span>
                <Form/>
                <Card/>
                
            </span>
        )
        
    }
}

  
export default connect(
    null,
    { getUsers }
  )(App);