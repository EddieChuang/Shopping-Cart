"use strict"
import React from 'react';
import Menu from './Menu';
import Footer from './Footer';
import {connect} from 'react-redux';
import {getCart} from '../actions/cartActions';
import {bindActionCreators} from 'redux';

class Main extends React.Component {

    componentDidMount(){
        this.props.getCart();
    }

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

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getCart: getCart
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);