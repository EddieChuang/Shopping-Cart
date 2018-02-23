"use strict"
import React from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {postBooks} from '../../actions/booksActions';

class BooksForm extends React.Component{

    handleSubmit(){
        const book = [{
            title: ReactDOM.findDOMNode(this.refs.title).value,
            description: ReactDOM.findDOMNode(this.refs.description).value,
            price: ReactDOM.findDOMNode(this.refs.price).value            
        }];
        console.log("handleSubmit");
        this.props.postBooks(book);
    }

    componentDidMount(){
        console.log("BooksForms componentDidMount");
        
    }

    render(){
        console.log("BooksForms render");
        return(
            <Well>
                <Panel>
                    <FormGroup controlId="title">
                        <ControlLabel>Title</ControlLabel>
                        <FormControl 
                            type="text"
                            placeholder="Enter Title"
                            ref="title"/>
                    </FormGroup>
                    <FormGroup controlId="description">
                        <ControlLabel>description</ControlLabel>
                        <FormControl 
                            type="text"
                            placeholder="Enter description"
                            ref="description"/>
                    </FormGroup>
                    <FormGroup controlId="price">
                        <ControlLabel>price</ControlLabel>
                        <FormControl 
                            type="text"
                            placeholder="Enter price"
                            ref="price"/>
                    </FormGroup>
                    <Button onClick={this.handleSubmit.bind(this)} bsStyle="primary">Save book</Button>
                </Panel>
            </Well>
        )
    }
}

function mapDispatchToProps(dispatch){
    console.log("BooksForm mapDispatchToProps");
    return bindActionCreators({postBooks:postBooks}, dispatch);
}

export default connect(null, mapDispatchToProps)(BooksForm);