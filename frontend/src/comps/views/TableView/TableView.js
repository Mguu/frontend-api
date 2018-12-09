/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getCatalog } from 'actions';
import { List, AutoSizer } from 'react-virtualized';
import _, { throttle } from 'lodash';

import okved from './okved';

import Selector from './../../Selector';

import 'react-virtualized/styles.css';

import styles from './TableView.styl';


// https://stackoverflow.com/questions/44683493/infinite-scroll-with-table-react-virtualized
// https://github.com/bvaughn/react-virtualized/blob/master/docs/InfiniteLoader.md

class TableView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchInn: '',
      searchName: '',
      okved: ''
    };

    this.dataProvider = this.makeOkvedDataProvider(okved);
  }


  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    catalog: PropTypes.object.isRequired,
    getCatalog: PropTypes.func.isRequired
  };

  makeOkvedDataProvider(data) {
    let okved = [{ value: '', title: 'Все' }];
    for (let i = 1; i < data.length; i++) {
      okved.push({ value: data[i][1], title: `${data[i][1]} - ${data[i][0]}` });
    }
    return okved;
  }

  componentDidMount() {
    // this.loadMoreRows({ startIndex: 0, stopIndex: 9 });
    console.log('compDid');
    if (this.props.catalog.data.length == 0) {
      this.props.getCatalog(this.state);
    }
  }

  onRowClick = e => {
    console.log('onRowClick', e.target.id);
    this.props.history.push(`/catalog/${e.target.id}`);
  }

  renderRow = ({ index, key, style }) => {
    const list = this.props.catalog.data;
    return (
    <div className={styles.row} onClick={this.onRowClick} key={key} id={list[index] && list[index].INN} style={style}>
        <div style={{ marginRight: '50px', pointerEvents: 'none' }} className={styles.innText}>
          <span>{list[index] && list[index].INN}</span>
        </div>
        <div style={{ pointerEvents: 'none', width: '360px' }} className="content">
          <div>{list[index] && list[index].COMPANY_SHORT_NAME}</div>
          <div className={styles.smallText}>{list[index] && list[index].LEGAL_ADDRESS}</div>
        </div>
        { list[index] ? this.renderStatus(list[index].ACTIVE) : null }
    </div>);
  }

  renderStatus(active) {
    return (
      <div className={active ? styles.active : styles.dead}>{active ? 'Действующая' : 'Ликвидирована' }</div>
    )
  }

  onInnInputChange = e => {
    console.log(e.target.value);
    this.setState({ searchInn: e.target.value });
  }

  onNameInputChange = e => {
    console.log(e.target.value);
    this.setState({ searchName: e.target.value });
  }

  onOvedChange = e => {
    console.log(e.target.value);
    this.setState({ okved: e.target.value });
  }

  startSearch = () => {
    console.log('start search');
    this.props.getCatalog(this.state);
  }

  render() {
    return (
        <div style={{ width: '100%', height: '100%' }}>
        <div style={{ height: 'calc(100vh - 190px)', width: '80%', margin: 'auto' }}>
        <div className={styles.searchPanel}>
          <input
            onChange={this.onInnInputChange}
            value={this.state.searchInn}
            className={styles.innInput}
            type="text"
            placeholder="ИНН" />
          <input
            onChange={this.onNameInputChange}
            value={this.state.searchName}
            className={styles.innInput}
            type="text"
            placeholder="Название" />
          <Selector
            width="300px"
            onChange={this.onOvedChange}
            value={this.state.okved}
            dataProvider={this.dataProvider}
            placeholder="ОКВЭД" />
          <button className={styles.searchBtn} onClick={this.startSearch}>Поиск</button>
        </div>
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


function mapStateToProps(state, ownProps) {
  console.log('mapstate', ownProps);
  return { catalog: state.catalog };
}


function mapDispatchToProps(dispatch) {
  let actions = {};
  actions.getCatalog = getCatalog;
  return bindActionCreators(actions, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TableView));
