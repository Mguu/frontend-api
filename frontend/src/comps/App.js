import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { } from '../actions';

import ErrorView from 'comps/views/ErrorView';
import TableView from 'comps/views/TableView';

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch,
  withRouter
} from 'react-router-dom';

import styles from './App.styl';
import eagle from './../../assets/icons/eagle@2x.png';

class App extends Component {

  constructor(props) {
    super(props);

  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  getTabBtnClassName(tab) {
    const path = this.props.location.pathname;
    return (tab && path.indexOf(tab) !== -1)
      ? classnames(styles.tabItem, styles.tabActive)
      : styles.tabItem;
  }


  render() {

    return (

      <div>
         <div className={styles.header}>
            <Link to="/">
              <img className={styles.eagle} alt="" src={eagle} />
            </Link>
            <NavLink to="/" activeClassName={styles.active}>
              <button className={this.getTabBtnClassName('')} id="">
                Каталог предприятий
              </button>
            </NavLink>
            <button
              style={{ color: '#cccccc', cursor: 'default' }}
              className={this.getTabBtnClassName('docs')}
              id="docs">
              Инновации
            </button>
            <button
              style={{ color: '#cccccc', cursor: 'default' }}
              className={this.getTabBtnClassName('settings')}
              id="settings">
              Аналитика
            </button>
          </div>
        <div>
          <Switch>
            <Route exact path="/" component={ TableView } />
            <Route component={ ErrorView } />
          </Switch>
        </div>
        {/* <ModalWindow/> */}
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