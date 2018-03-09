"use strict"
import axios from 'axios';
import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';

import reducers from './src/reducers/index';
import routes from './src/routes';

function handleRender(req, res){
    axios.get('http://localhost:3001/books')
      .then(function(response){
          // var myHtml = JSON.stringify(response.data);
          // res.render('index', {myHtml});

          const store = createStore(reducers, {"books":{"books":response.data}});
          const initialState = JSON.stringify(store.getState())
          initialState.replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');

          const Routes = {
            routes:routes,
            location:req.url
          };
          match(Routes, function(err, redirect, props){
              if(error){
                  res.status(500).send('Error fullfilling the request');
                
              } else if(redirect){ 
                  res.status(302, redirect.pathname + redirect.search)
              }else if(props){
                  const reactComponent = renderToString(
                    <Provider store={store}>
                      <RouterContext {...props} />
                    </Provider>
                  )
                  res.status(200).render('index', {reactComponent, initialState});
              } else{
                  res.status(300).send('Not Found');
                
              }
          })
      
      
      })
      .catch(function(err){
          console.log("#Initial SSR error", err);
      })
}

module.exports = handleRender;