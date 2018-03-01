"use strict"
import React from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {postBooks, deleteBooks} from '../../actions/booksActions';

class BooksForm extends React.Component{

    componentDidMount(){
        console.log("BooksForms componentDidMount");
        
    }

    handleSubmit(){
        const book = [{
            title: ReactDOM.findDOMNode(this.refs.title).value,
            description: ReactDOM.findDOMNode(this.refs.description).value,
            price: ReactDOM.findDOMNode(this.refs.price).value            
        }];
        console.log("handleSubmit");
        this.props.postBooks(book);
    }

    onDelete(){
        let bookId = findDOMNode(this.refs.delete).value;
        this.props.deleteBooks(bookId);
    }

    render(){
        console.log("BooksForms render");

        const booksList = this.props.books.map(function(booksArr){
            return (
                <option key={booksArr._id}>{booksArr._id}</option>
            )
        })
        console.log(booksList);
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
                <Panel style={{marginTop:'25px'}}>
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Select a book id to delete</ControlLabel>
                        <FormControl ref="delete" componentClass="select" placeholder="select">
                            <option value="select">select</option>
                            {booksList}
                        </FormControl>
                    </FormGroup>
                    <Button onClick={this.onDelete.bind(this)} bsStyle="danger">Delete book</Button>
                </Panel>
            </Well>
        )
    }
}

function mapStateToProps(state){
    console.log("BooksForm mapStateToProps");
    return {
        books: state.books.books
    };
}

function mapDispatchToProps(dispatch){
    console.log("BooksForm mapDispatchToProps");
    return bindActionCreators({
        postBooks:postBooks,
        deleteBooks: deleteBooks
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);