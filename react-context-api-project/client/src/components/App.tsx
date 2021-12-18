import React, { Component } from "react";
import Card from "./Cards";
import Form from "./Form";
import axios from "./axios";
import "../css/main.css"
import CardContext from "../context/CardContext";

  type MyState = {
    users: any; 
    isModal:boolean;
    userIndex:number;
    deleteUser:any;
  };
class App extends Component {
    deleteUser = async(id :number, i:number) => {
        const res = await axios.post('/user/deleteUser/',{'user_id':id});
        if(res.status === 200){
            const users = this.state.users;
            users.splice(i, 1);
            this.setState({ users });
        }
        
      };

    state : MyState  = {users: [], isModal:false, userIndex: 0, deleteUser: this.deleteUser };
    
    async componentDidMount(){
        const res = await axios.get('/user/getUsers/');
        if(res.status === 200){
            this.setState({ users:res.data });
        }
    }
    onFormSubmit = async (user :any) => {
        this.setState((prevState :any) => ({
            users: [user, ...prevState.users]
        }))
    };
    
    onEditFormSubmit = async (user :object) => {
        let users :any= [...this.state.users];
        users[this.state.userIndex] = user;
        this.setState({users});
        this.setState({isModal:false});
    };
    
    cancelModal = async () =>{
        this.setState({isModal:false});
    }

    
    render(){
       
        return(
            <span>
                <Form onSubmit={this.onFormSubmit}/>
                <CardContext.Provider value ={this.state}>
                   <Card/> 
                </CardContext.Provider>
            </span>
        )
        
    }
}

export default App;