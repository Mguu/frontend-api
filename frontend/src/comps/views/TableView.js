/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { List, AutoSizer, InfiniteLoader } from 'react-virtualized';
import 'react-virtualized/styles.css';

const ROW_COUNT = 100000;

// https://stackoverflow.com/questions/44683493/infinite-scroll-with-table-react-virtualized
// https://github.com/bvaughn/react-virtualized/blob/master/docs/InfiniteLoader.md

class TableView extends Component {

  constructor(props) {
    super(props);

    this.state = {actualData: []};
  }

  componentDidMount() {
    // this.loadMoreRows({ startIndex: 0, stopIndex: 9 });
  }

  isRowLoaded = ({ index }) => {
    console.log('isRowLoaded', index);
    return !!this.state.actualData[index];
  }

  loadMoreRows = ({ startIndex, stopIndex }) => (axios.get(`http://localhost:3000/catalog?startIndex=${startIndex}&stopIndex=${stopIndex}`)
    .then(resp => {
      // Store response data in list...
      console.log(resp.data);
      this.setState({ actualData: resp.data.data });
      // this.list = resp.data.data;
    }))


  renderRow = ({ index, key, style }) => {
    const list = this.state.actualData;
    if (!list[index]) {
      return <div style={{ textAlign: 'center', height: '100px' }}> loading...</div>;
    }
    return (
    <div key={key} style={{ height: '100px' }} className="row">
        <div className="image">
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
        <div style={{ height: 'calc(100vh - 90px)', width: '80%', margin: 'auto' }}>
        <InfiniteLoader
          isRowLoaded={this.isRowLoaded}
          loadMoreRows={this.loadMoreRows}
          rowCount={ROW_COUNT}>
          {({ onRowsRendered, registerChild }) => (
                    <List
                      width={700}
                      height={600}
                      ref={registerChild}
                      /* className={styles.List} */
                      onRowsRendered={onRowsRendered}
                      rowCount={ROW_COUNT}
                      rowHeight={100}
                      overscanRowsCount={30}
                      rowRenderer={this.renderRow} />
            )
         }
        </InfiniteLoader>
        </div>
        </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  let actions = {};
  // actions.showModalWindow = showModalWindow;
  return bindActionCreators(actions, dispatch);
}

export default connect(null, mapDispatchToProps)(TableView);
