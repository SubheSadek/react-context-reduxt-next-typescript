import React, { Component } from "react";
import axios from "./axios";
import { connect } from 'react-redux';
import { editUserInfo, deleteUserInfo } from "../redux/actions";
import Avatar from './editupload';
import Head from "next/head";
interface IUserProps {
    deleteUserInfo?: any;
    editUserInfo?: any;
    users?: any;
  }
class Card extends Component <IUserProps>{
    state ={
        user:{id:''},
        errors:{
            name:'',
            email:'',
            title:'',
            image:'',
        },
        isShow: false,
    };
    async deleteUser(id :any, i :number){
        const res = await axios.post('/user/deleteUser/',{'user_id':id});
        if(res.status === 200){
            this.props.deleteUserInfo(i)
        }
    }
    
    async editUser(user :any, i :number){
        user['isShow'] = true;
        this.setState({user:user});
    }
    
    async cancelInline(user:any){
        user['isShow'] = false;
        this.setState({user:user});
    }
    
    handleChange(field :any, e :any) {
        let fields :any= this.state.user;
        fields[field] = e.target.value;
        this.setState({ fields });

        let errors  :any= this.state.errors;
        errors[field] = "";
        this.setState({ errors });
    }
    
    onFormSubmit = async (e :any) =>{
        // e.preventDefault();
        console.log('from method')
        let validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let fields :any= this.state.user;
        let errors :any= {};
        let formInvalid :boolean= false;

        if(!fields.name || fields.name === ''){
            errors.name = "Name is required.";
            formInvalid = true;
        }
        
        if(fields.email === "" || fields.email === null){
            errors.email = "Email is required.";
            formInvalid = true;
        }
        if(fields.email && !validateEmail.test(fields.email)){
            errors.email = "Invalid email format.";
            formInvalid = true;
        }
        
        if(fields.title === ""){
            errors.title = "Title is required";
            formInvalid = true;
        }
        
        if(fields.image === ""){
            errors.image = "Image url is required.";
            formInvalid = true;
        }

        if(formInvalid){
            return this.setState({ errors: errors });
        }
        
        this.setState({isLoading: true})
        
        const res = await axios.post('/user/editUser/', fields);
        if(res.status === 200){
            fields['isShow'] = false;
            this.props.editUserInfo(this.state.user.id, fields);
        }
        
        this.setState({isLoading: false})
        
        
    };
    
    onUpload = async (image :any) =>{
        let fields :any= this.state.user;
        fields['image'] = image;
        this.setState({ fields });
    }


    render(){
        let cards = this.props.users ?this.props.users.map((user :any, i :number) => {
            return (
                
                <div className="col-xl col-md col-sm col-12" key={i}>
                                
                    <div className="_react_card_content">
                        <div className="_react_card_content_inner">
                            <div className="_react_card_content_inner_icon_wrap">
                                <div className="_react_card_content_inner_icon">
                                    <svg onClick={() => {if (window.confirm('Are you sure you wish to delete this user?')) this.deleteUser(user.id, i)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash card_delete_icon" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                </div>
                                <div className="_react_card_content_inner_icon">
                                    <svg onClick={() => this.editUser(user, i)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>
                                </div>
                            </div>
                            {
                                user.isShow ? 
                                <span>
                                    <div className="_react_card_img_wrap">
                                        <Avatar  onUpload = {this.onUpload} />
                                    <img src={user.image} alt="img" className="_react_card_img" />
                                    </div>
                                    <div className="_react_card_txt">
                                        <h3 className="_react_card_name inplace_edit">
                                            <input value={user.name} onChange={this.handleChange.bind(this, "name")}/>
                                            <span className="error-text">{this.state.errors.name}</span>
                                        </h3>
                                        <p className="_react_card_email inplace_edit">
                                            <input value={user.email} onChange={this.handleChange.bind(this, "email")}/>
                                            <span className="error-text">{this.state.errors.email}</span>
                                        </p>
                                        
                                        <h4 className="_react_card_title inplace_edit">
                                            <input value={user.title} onChange={this.handleChange.bind(this, "title")}/>
                                            <span className="error-text">{this.state.errors.title}</span>
                                        </h4>
                                        
                                    </div>
                                    <div>
                                        <button onClick={() => this.cancelInline(user)} type="button" className="btn btn-secondary btn-sm" style={{marginRight:'10px'}}>Cancel</button>
                                        <button onClick={this.onFormSubmit} type="button" className="btn btn-primary btn-sm">Edit</button>
                                    </div>
                                </span>
                                :
                                <span>
                                    <div className="_react_card_img_wrap">
                                    <img src={user.image} alt="img" className="_react_card_img" />
                                    </div>
                                    <div className="_react_card_txt">
                                        <h3 className="_react_card_name">{user.name}</h3>
                                        <p className="_react_card_email">{user.email}</p>
                                        <h4 className="_react_card_title">{user.title}</h4>
                                    </div>
                                </span>
                            }
                            
                            
                        </div>
                    </div>
                
                </div>

            );
          }):'';
        return(
        <span>
            <Head>
              <link rel="stylesheet" href="css/card.css"/> 
            </Head>
            <div className="_react_card_wrapper">
                <div className="_react_card_wrap">
                    <div className="container">
                        <div className="_react_card_content_wrap">
                            <div className="row">
                                {cards}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </span>
        )
    }
}
const mapStateToProps = (state :any) => {
    return { users: state.allUsers.users };
  };
  export default connect(
    mapStateToProps,
    {editUserInfo, deleteUserInfo}
  )(Card);
