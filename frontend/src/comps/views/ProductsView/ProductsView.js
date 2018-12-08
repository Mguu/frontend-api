import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class ProductsView extends Component {


    static propTypes = {
      match: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired
    };


    componentDidMount() {

    }


    render() {
      return (
        <div style={{ width: '100%', height: '100%' }}>
          Products view
        </div>
      );
    }
}


function mapStateToProps(state, ownProps) {
  console.log('mapstate', ownProps);
  return { catalog: state.catalog };
}


function mapDispatchToProps(dispatch) {
  let actions = {};
  // actions.getCatalog = getCatalog;
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsView);

