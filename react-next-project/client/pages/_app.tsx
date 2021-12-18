import App from 'next/app';
import {Provider} from 'react-redux';
import React from 'react';
import withRedux from "next-redux-wrapper";
import store from '../redux/store';

class MyApp extends App {

      static async getInitialProps({ Component, ctx } :any) {
        let pageProps = {};

        if (Component.getInitialProps) {
          pageProps = await Component.getInitialProps({ ctx });
        }
        return { pageProps };
      }

    render() {
        //pageProps that were returned  from 'getInitialProps' are stored in the props i.e. pageprops
        const {Component, pageProps, store} :any = this.props;

        return (
         
            <Provider store={store}>
                <Component {...pageProps}/>
            </Provider>
          
        
          
            
        );
    }
}

//makeStore function that returns a new store for every request
const makeStore = () => store;

//withRedux wrapper that passes the store to the App Component
export default withRedux(makeStore)(MyApp);