/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { List, AutoSizer, Column, Table, InfiniteLoader } from 'react-virtualized';
import 'react-virtualized/styles.css';

const ROW_COUNT = 500000;

// https://stackoverflow.com/questions/44683493/infinite-scroll-with-table-react-virtualized

class TableView extends Component {

  constructor(props) {
    super(props);

    this.state = {
        loadedRowCount: 0,
        loadedRowsMap: {},
        loadingRowCount: 0,
    };

    this._timeoutIdMap = {};

    this.list = Array(ROW_COUNT).fill().map((val, id) => ({
      id,
      name: 'John Doe',
      image: 'http://via.placeholder.com/40',
      text: `ООО "Ромашка - ${id}"`
    }));
  }



    renderRow = ({ index, key, style }) => (

      <div key={key} style={style} className="row">
        <div className="image">
          <img src={this.list[index].image} alt="" />
        </div>
        <div className="content">
          <div>{this.list[index].name}</div>
          <div>{this.list[index].text}</div>
        </div>
      </div>

    )

    render() {
      return (
        <div style={{ width: '100%', height: '100%' }}>
        <div style={{ height: 'calc(100vh - 90px)', width: '80%', margin: 'auto' }}>
          <AutoSizer>
            {
                ({ width, height }) => (
                <Table
                  width={width}
                  height={height}
                  headerHeight={20}
                  rowHeight={100}
                  rowCount={this.list.length}
                  rowGetter={({ index }) => this.list[index]}>
                  <Column
                    label="Фото"
                    dataKey="image" />
                  <Column
                    label="Имя"
                    dataKey="name" />
                  <Column
                    label="Текст"
                    dataKey="text" />
                </Table>)
            }
          </AutoSizer>
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
