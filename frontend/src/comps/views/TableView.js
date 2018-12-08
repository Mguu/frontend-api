/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getCatalog } from './../../actions';
import axios from 'axios';
import { List, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css';


// https://stackoverflow.com/questions/44683493/infinite-scroll-with-table-react-virtualized
// https://github.com/bvaughn/react-virtualized/blob/master/docs/InfiniteLoader.md

class TableView extends Component {

  constructor(props) {
    super(props);

  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    catalog: PropTypes.object.isRequired,
    getCatalog: PropTypes.func.isRequired
  };

  componentDidMount() {
    // this.loadMoreRows({ startIndex: 0, stopIndex: 9 });
    console.log('compDid');
    if (this.props.catalog.data.length == 0) {
      this.props.getCatalog();
    }
  }

  /* loadMoreRows = () => (axios.get('http://localhost:3000/catalog?v=2')
    .then(resp => {
      // Store response data in list...
      console.log(resp.data);
      this.setState({ actualData: resp.data.data });
      // this.list = resp.data.data;
    })) */


  renderRow = ({ index, key, style }) => {
    const list = this.props.catalog.data;
    return (
    <div key={key} style={{ ...style, height: '100px', borderBottom: '1px solid grey', padding: '10px', display: 'flex', alignItems: 'center' }} className="row">
        <div style={{ marginRight: '50px' }} className="image">
          <img src={list[index] && list[index].image} alt="" />
        </div>
        <div className="content">
          <div>{list[index] && list[index].name}</div>
          <div>{list[index] && list[index].text}</div>
        </div>
    </div>);
  }

  render() {
    return (
        <div style={{ width: '100%', height: '100%' }}>
        <div style={{ height: 'calc(100vh - 170px)', width: '80%', margin: 'auto' }}>
        <div style={{ height: '80px' }}></div>
        <AutoSizer>
          {
          ({ width, height }) => (
            <List
              width={width}
              height={height}
              rowHeight={100}
              rowRenderer={this.renderRow}
              rowCount={this.props.catalog.rowCount}
              overscanRowCount={3} />)
        }
        </AutoSizer>
        </div>
        </div>
    );
  }
}


function mapStateToProps(state) {
  console.log('mapstate');
  return {
    catalog: state.catalog
  };
}


function mapDispatchToProps(dispatch) {
  let actions = {};
  actions.getCatalog = getCatalog;
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TableView);
