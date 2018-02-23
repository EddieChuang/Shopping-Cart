"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBooks} from '../../actions/booksActions';
import {Grid, Col, Row, Button} from 'react-bootstrap';
import BookItem from './BookItem';
import BooksForm from './BooksForm';
import Cart from './Cart';


class BooksList extends React.Component{

    componentDidMount(){
        // Dispatch an action
        console.log("BooksList componentDidMount");
        // this.props.getBooks();
    }

    render(){
        
        // console.log(this.props.books);
        const booksList = this.props.books.map(function(booksArr){
            return (
                <Col xs={12} sm={6} md={4} key={booksArr._id}>
                    <BookItem 
                        _id={booksArr._id}
                        title={booksArr.title}
                        description={booksArr.description}
                        price={booksArr.price}
                     />
                </Col>

            )
        })
        console.log("BooksList render");
        return(
            <Grid>
                <Row>
                    <Cart />
                </Row>
                <Row style={{marginTop:'15px'}}>
                    <Col xs={12} sm={6} key={1}>
                        <BooksForm />
                    </Col>
                    {booksList}
                </Row>
            </Grid>
        )
    }
}

function mapStateToProps(state){
    console.log("BooksList mapStateToProps ", state);
    return{
        books: state.books.books
    }
}

function mapDispatchToProps(dispatch){
    console.log("BooksList mapDispatchToProps");
    return bindActionCreators({getBooks:getBooks}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);