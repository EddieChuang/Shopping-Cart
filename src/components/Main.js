"use strict"
import React from 'react';
import Menu from './Menu';
import Footer from './Footer';
import {connect} from 'react-redux';

class Main extends React.Component {
    render(){
        return (
            <div>
                <Menu cartItemsNumber={this.props.quantity}/>
                    {this.props.children}
                <Footer />
            </div>
        )
    };
}

function mapStateToProps(state){
    return {
        quantity: state.cart.quantity
    }
}


export default connect(mapStateToProps)(Main);