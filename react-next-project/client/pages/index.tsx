import React from 'react';
import {connect} from 'react-redux';
import Form from '../components/Form'
import Head from 'next/head';
import axios from '../components/axios';
import Card from '../components/Cards'
import { getUsers } from "../redux/actions";

interface IUserProps {
  getUsers?: any;
}

class App extends React.Component <IUserProps>{

    static getInitialProps({store} :any) {}
    
    async componentDidMount(){
      const res = await axios.get('/user/getUsers/');
      if(res.status === 200){
          this.props.getUsers(res.data);
          }
      }

    render() {
        return (
            <span>
              <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Lato:wght@100;300;400;700;900&display=swap" />
               
                <link rel="stylesheet" href="assets/css/bootstrap.min.css"/>
               
                <link rel="stylesheet" href="assets/css/style.css"/>
                
                <link rel="stylesheet" href="assets/css/responsive.css"/> 
            </Head>
              <Form />
              <Card />
            </span>
        );
    }
}

export default connect( null ,{getUsers})(App)