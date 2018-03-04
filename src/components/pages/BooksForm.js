"use strict"
import React from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {MenuItem, InputGroup, DropdownButton, Image, Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {postBooks, deleteBooks, getBooks, resetButton} from '../../actions/booksActions';
import axios from 'axios';

class BooksForm extends React.Component{

    constructor(){
        super();
        this.state = {
            images: [{}],
            img: ''
        }
    }

    componentDidMount(){
        console.log("BooksForms componentDidMount");
        this.props.getBooks();
        axios.get('/api/images')
          .then(function(response){
              this.setState({images: response.data})
          }.bind(this))
          .catch(function(err){
              this.setState({images:'error loading files from the server', img:''})
          })
    }

    handleSubmit(){
        const book = [{
            title: ReactDOM.findDOMNode(this.refs.title).value,
            description: ReactDOM.findDOMNode(this.refs.description).value,
            images: ReactDOM.findDOMNode(this.refs.image).value,
            price: ReactDOM.findDOMNode(this.refs.price).value            
        }];
        console.log("handleSubmit");
        this.props.postBooks(book);
    }

    handleSelect(img){
        this.setState({
            img: '/images/' + img
        })
    }

    onDelete(){
        let bookId = findDOMNode(this.refs.delete).value;
        this.props.deleteBooks(bookId);
    }

    resetForm(){

        this.props.resetButton();
        ReactDOM.findDOMNode(this.refs.title).value = "";
        ReactDOM.findDOMNode(this.refs.description).value = "";
        ReactDOM.findDOMNode(this.refs.price).value = "";       
        this.setState({img:''});
    }

    render(){
        console.log("BooksForms render");

        const booksList = this.props.books.map(function(booksArr){
            return (
                <option key={booksArr._id}>{booksArr._id}</option>
            )
        });

        const imgList = this.state.images.map(function(imgArr, i){
            return (
                <MenuItem key={i} onClick={this.handleSelect.bind(this, imgArr.name)} eventKey={imgArr.name}>{imgArr.name}
                    
                </MenuItem>
            )
        }, this)

        console.log(booksList);
        return(
            <Well>
                <Row>
                    <Col xs={12} sm={6}>
                        <Panel>
                            <InputGroup>
                                <FormControl type="text" ref="image" value={this.state.img}/>
                                <DropdownButton
                                    componentClass={InputGroup.Button}
                                    id="input-dropdown-addon"
                                    title="Select an image"
                                    bsStyle="primary" >
                                    {imgList}
                                </DropdownButton>
                            </InputGroup>
                            <Image src={this.state.img} responsive />
                        </Panel>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Panel>
                            <FormGroup controlId="title" validationState={this.props.validation}>
                                <ControlLabel>Title</ControlLabel>
                                <FormControl 
                                    type="text"
                                    placeholder="Enter Title"
                                    ref="title"/>
                                <FormControl.Feedback />
                            </FormGroup>
                            <FormGroup controlId="description" validationState={this.props.validation}>
                                <ControlLabel>description</ControlLabel>
                                <FormControl 
                                    type="text"
                                    placeholder="Enter description"
                                    ref="description"/>
                                <FormControl.Feedback />
                            </FormGroup>
                            <FormGroup controlId="price" validationState={this.props.validation}>
                                <ControlLabel>price</ControlLabel>
                                <FormControl 
                                    type="text"
                                    placeholder="Enter price"
                                    ref="price"/>
                                <FormControl.Feedback />
                            </FormGroup>
                            <Button 
                                onClick={(!this.props.msg)?(this.handleSubmit.bind(this)):(this.resetForm.bind(this))} 
                                bsStyle={(!this.props.style)?("primary"):(this.props.style)}>
                                {(!this.props.msg)?("Save book"):(this.props.msg)}
                            </Button>
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
                    </Col>
                </Row>
               
            </Well>
        )
    }
}

function mapStateToProps(state){
    console.log("BooksForm mapStateToProps");
    return {
        books: state.books.books,
        msg: state.books.msg,
        style: state.books.style,
        validation: state.books.validation
    };
}

function mapDispatchToProps(dispatch){
    console.log("BooksForm mapDispatchToProps");
    return bindActionCreators({
        postBooks:postBooks,
        deleteBooks: deleteBooks,
        getBooks: getBooks,
        resetButton: resetButton
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);