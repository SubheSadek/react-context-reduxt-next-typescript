
import React, { Component } from "react";
import '../css/editUser.css';
import axios from "./axios";

interface IUserProps {
    singleUser?: any;
    onSubmit?: any;
    cancelModel?: any;
  }

class editUser extends Component <IUserProps>{
    
    state = {
        formData: {
            id: this.props.singleUser.id,
            name:  this.props.singleUser.name,
            email: this.props.singleUser.email,
            title: this.props.singleUser.title,
            image: this.props.singleUser.image,
        },
        errors: {
            name: '',
            email:'',
            title:'',
            image:'',
        },
        isLoading: false,
    };
    
    onFormSubmit = async (e :any) =>{
        e.preventDefault();
        
        let validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

        let fields :any= this.state.formData;
        let errors :any= {};
        let formInvalid = false;

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

        if(fields.image && !pattern.test(fields.image)){
            errors.image = "Invalid url format." ;
            formInvalid = true;
        }
        if(formInvalid){
            return this.setState({ errors: errors });
        }
        
        this.setState({isLoading: true})
        
        const res = await axios.post('/user/editUser/', fields);
        if(res.status === 200){
            this.props.onSubmit(fields);
        }
        
        this.setState({isLoading: false})
        
        
    };
    
    handleChange(field :any, e :any) {
        let fields :any= this.state.formData;
        fields[field] = e.target.value;
        this.setState({ fields });

        let errors :any= this.state.errors;
        errors[field] = "";
        this.setState({ errors });
    }
    
    render(){
        let isLoading = this.state.isLoading;
        return(
            <div className="modal fade show" style={{ display: "block", paddingRight: "17px"}} id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Update User Info</h5>
                        <button  onClick={ () => this.props.cancelModel()} type="button" className="close_btn" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={this.onFormSubmit}>
                            
                            <div className="form-group">
                                <label htmlFor="Name-name" className="col-form-label">Name:</label>
                                <input value={this.state.formData.name} onChange={this.handleChange.bind(this, "name")} type="text" className="form-control" id="Name-name"/>
                                <span className="error-text">{this.state.errors.name}</span>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="Email-name" className="col-form-label">Email:</label>
                                <input value={this.state.formData.email} onChange={this.handleChange.bind(this, "email")} type="text" className="form-control" id="Email-name"/>
                                <span className="error-text">{this.state.errors.email}</span>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="Title-name" className="col-form-label">Title:</label>
                                <input value={this.state.formData.title} onChange={this.handleChange.bind(this, "title")} type="text" className="form-control" id="Title-name"/>
                                <span className="error-text">{this.state.errors.title}</span>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="Image-name" className="col-form-label">Image:</label>
                                <input value={this.state.formData.image} onChange={this.handleChange.bind(this, "image")} type="text" className="form-control" id="Image-name"/>
                                <span className="error-text">{this.state.errors.image}</span>
                            </div>
                            
                            <div className="modal-footer">
                                <button onClick={ () => this.props.cancelModel()} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                {
                                isLoading ?
                                <button className="btn btn-primary" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Please wait...
                                </button>:
                                <button type="submit" className="btn btn-primary">Update</button>
                                }
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default editUser;
