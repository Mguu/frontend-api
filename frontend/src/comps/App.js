import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
// import { } from '../actions';

import ErrorView from './views/ErrorView';
import TableView from './views/TableView';
import FirmView from './views/FirmView';
import ProductsView from './views/ProductsView';
import AnalyticsView from './views/AnalyticsView';

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
import vk from './../../assets/icons/vk.png';

class App extends Component {


  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  auth(e) {
    e.preventDefault();
    window.location = 'https://oauth.vk.com/authorize?client_id=6777108&redirect_uri=http://u4.startup-club.tech/verify&display=popup&response_type=code&v=5.92';
  }


  render() {
    return (

      <div>
        <div className={styles.header}>
          <Link to="/">
            <img className={styles.eagle} alt="" src={eagle} />
          </Link>
          <NavLink exact to="/" activeClassName={styles.active}>
            <button className={styles.tabItem}>
                Каталог предприятий
            </button>
          </NavLink>
          <NavLink to="/products" activeClassName={styles.active}>
            <button
              className={styles.tabItem}
              id="products">
                Продукты и услуги
            </button>
          </NavLink>
          <NavLink to="/analytics" activeClassName={styles.active}>
            <button
              className={styles.tabItem}
              id="settings">
              Аналитика
            </button>
          </NavLink>
          {/* <Link onClick={this.auth} to="/">
            <img className={styles.vk} src={vk} alt="" />
            </Link> */}
        </div>
        <div>
          <Switch>
            <Route exact path="/" component={TableView} />
            <Route exact path="/catalog/:inn" component={FirmView} />
            <Route exact path="/products" component={ProductsView} />
            <Route exact path="/analytics" component={AnalyticsView} />
            <Route component={ErrorView} />
          </Switch>
        </div>
        {/* <ModalWindow/> */}
      </div>
    );
  }
}


function mapStateToProps(state) {
  console.log('app#mapStateToProps');
  return { session: state.session };
}

function mapDispatchToProps(dispatch) {
  let actions = {};
  return bindActionCreators(actions, dispatch);
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
