import React, { Component } from 'react';

import './css/error.css';


export default class BlankPage extends Component {

 constructor(props) {
   super(props);
   console.log("BlankPage");
 }


  render() {

    return (
      <div className="error-view">
        <p className="error-digits">404</p>
        <p className="error-word">ERROR</p>
      </div>
    );
  }
}