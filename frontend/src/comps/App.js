import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { } from '../actions';

import ErrorView from 'comps/views/ErrorView';
import TableView from 'comps/views/TableView';



import ModalWindow from 'comps/modals/ModalWindow';


import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter
} from 'react-router-dom';




class App extends Component {

  constructor(props) {
    super(props);

  }



  render() {

    return (

      <div>
        <div>
          <Switch>
            <Route exact path="/" component={ TableView } />
            <Route component={ ErrorView } />
          </Switch>
        </div>
        <ModalWindow/>
      </div>
    );
  }
}


function mapStateToProps(state) {
  console.log("app#mapStateToProps");
  return { session: state.session };
}

function mapDispatchToProps(dispatch) {
  var actions = {};
  return bindActionCreators(actions, dispatch);
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));