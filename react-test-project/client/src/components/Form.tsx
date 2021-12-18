import React, { Component } from "react";
import '../css/form.css'
import axios from "./axios";
import unplash from 'axios';
import Avatar from './upload'

interface IUserProps {
    onSubmit?: any;
  }
class Form extends Component <IUserProps>{

    state = {
        formData: {
            name: '',
            email:'',
            title:'',
            image:'',
        },
        errors: {
            name: '',
            email:'',
            title:'',
            image:'',
        },
        isLoading:false,
        isImage:false,
        linkModal:false,
        images:[],
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

        let fields = this.state.formData;
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
            errors.image = "Image is required.";
            formInvalid = true;
        }

        // if(fields.image && !pattern.test(fields.image)){
        //     errors.image = "Invalid url format." ;
        //     formInvalid = true;
        // }
        if(formInvalid){
            return this.setState({ errors: errors });
        }
        
        this.setState({isLoading:true})
        const res = await axios.post('/user/createUser/', fields);
        if(res.status === 200){
            this.props.onSubmit(res.data);
            
            fields.name = "";
            fields.email = "";
            fields.title = "";
            fields.image = "";
            
            this.setState({ fields });
        }
        this.setState({isLoading:false}) 
        
        
        
    };

    handleChange( field :any, e:any) {
        let fields :any= this.state.formData;
        fields[field] = e.target.value;
        // fields['email'] = e.target.value.email;
        // fields['title'] = e.target.value.title;
        // fields['image'] = e.target.value.image;
        this.setState({ fields });

        let errors :any= this.state.errors;
        errors[field] = "";
        // errors["email"] = "";
        // errors["title"] = "";
        // errors["image"] = "";
        this.setState({ errors });
    }

   getLinks = async() =>{
        const res = await unplash.get('https://api.unsplash.com/search/photos', {
            params: { query: 'avatar'},
            headers: {
                Authorization: 'Client-ID 2b98c1afb0aed3b3d94a1866bdc3ac013d21a0c86d236a0fee32355c331c0296'
            }
        })
        if(res.status === 200){
            this.setState({images:res.data.results});
            this.setState({isImage:true});
        }
        
    }
    
    // getImageLink = async image =>{
    //     let fields = this.state.formData;
    //     fields['image'] = image;
    //     this.setState({ fields });
    //     this.setState({isImage: false});
    // }
    
    onUpload = async (image :string) =>{
        let fields = this.state.formData;
        fields['image'] = image;
        this.setState({ fields });
    }
    
    render(){
        let isLoading = this.state.isLoading;
        let isImage = this.state.isImage;
        // let imagelists;
        
        if(isImage){
            // imagelists = <ImageList onClick={this.getImageLink} images={this.state.images} />;
        }
        
        return(
            <span>
                {/* {imagelists} */}
                <div className="_react_form_wrapper">
                    <div className="_react_form_wrap">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-6 col-lg-7 col-md-12 col-sm-12 mx-auto">
                                    <div className="_react_form_content">
                                        <div className="_react_form_content_inner">
                                            <form onSubmit={this.onFormSubmit} className="row g-3">
                                                <div className="col-md-12">
                                                    <label htmlFor="name" className="htmlForm-label">Name</label>
                                                    <input autoComplete="off" value = { this.state.formData["name"] } onChange={this.handleChange.bind(this, "name")}  type="text" className="form-control" />
                                                    <span className="error-text">{this.state.errors["name"]}</span>
                                                </div>
                                                <div className="col-md-12">
                                                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                                                    <input value = {this.state.formData.email} onChange={this.handleChange.bind(this, "email")} type="text" className="form-control" id="email" />
                                                    <span className="error-text">{this.state.errors.email}</span>
                                                </div>
                                               <div className="col-md-12">
                                                    <label htmlFor="title" className="form-label">Title</label>
                                                    <input value = {this.state.formData.title} onChange={this.handleChange.bind(this, "title")} type="text" className="form-control" id="title" />
                                                    <span className="error-text">{this.state.errors.title}</span>
                                                </div>
                                                {/* <div className="col-md-9">
                                                    <label htmlFor="image" className="form-label">Image URL</label>
                                                    <input value = {this.state.formData.image} onChange={this.handleChange.bind(this, "image")} type="text" className="form-control" id="image" />
                                                    <span className="error-text">{this.state.errors.image}</span>
                                                </div>
                                                <div className="col-md-3">
                                                    <p className="btn_odal_open">
                                                        <span onClick={this.getLinks}>
                                                            Get Links
                                                        </span>
                                                    </p>
                                                </div> */}
                                                
                                                <div  className="col-md-12">
                                                    <Avatar onUpload = {this.onUpload} />
                                                    <span className="error-text">{this.state.errors.image}</span>
                                                </div>
                                                
                                                <div className="col-5 mx-auto">
                                                    {isLoading ?
                                                    <button className="btn btn-primary" type="button" disabled>
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        Please wait...
                                                    </button>:
                                                    <button type="submit" className="btn btn-primary col-7 d-block w-100 py-2"> Submit </button>}
                                                </div> 
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        )
    }
}

export default Form;