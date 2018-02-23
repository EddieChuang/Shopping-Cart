"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {Panel, Col, Row, Well, Button, ButtonGroup, Label} from 'react-bootstrap';
import {deleteCartItem} from '../../actions/cartActions';
import {bindActionCreators} from 'redux';


class Cart extends React.Component{

    onDelete(_id){
        const currentCartToDelete = this.props.cart;
        const indexToDelete = currentCartToDelete.findIndex(function(cart){
            return cart._id === _id;
        })

        let cartAfterDelete = [...currentCartToDelete.slice(0, indexToDelete), ...currentCartToDelete.slice(indexToDelete + 1)];
        this.props.deleteCartItem(cartAfterDelete);
    }


    render(){
        if(this.props.cart[0]){
            return this.renderCart();
        } else {
            return this.renderEmpty();
        }
    }

    renderEmpty(){
        return(<div></div>);
    }

    renderCart(){
        const cartItemsList = this.props.cart.map(function(cartArr){
            return(
                <Panel key={cartArr._id}>
                    <Row>
                        <Col xs={12} sm={4}>
                            <h6>{cartArr.title}</h6><span>    </span>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>USD. {cartArr.price}</h6>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>Quantity <Label bsStyle="success">{cartArr.quantity}</Label></h6>
                        </Col>
                        <Col xs={6} sm={4}>
                            <ButtonGroup style={{minWidth:'300px'}}>
                                <Button bsStyle="default" bsSize="small">-</Button>
                                <Button bsStyle="default" bsSize="small">+</Button>
                                <span>     </span>
                                <Button onClick={this.onDelete.bind(this, cartArr._id)} bsStyle="danger" bsSize="small">DELETE</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Panel>
            )
        }, this)
        return(
            <Panel header="Cart" bsStyle="primary">
                {cartItemsList}
            </Panel>
        );
    }

}

function mapStateToProps(state){
    return{
        cart: state.cart.cart
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        deleteCartItem: deleteCartItem
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);