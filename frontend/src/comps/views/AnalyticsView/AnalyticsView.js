import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAgreggate } from './../../../actions';
import { HorizontalBar } from 'react-chartjs-2';
import okved from './../TableView/okved';

import styles from './Analytics.styl';


class AnalyticsView extends Component {


    static propTypes = {
      agreggate: PropTypes.array.isRequired,
      getAgreggate: PropTypes.func.isRequired
    };


    componentDidMount() {
      if (this.props.agreggate.length == 0) {
        this.props.getAgreggate();
      }
    }

    getDataArray() {
      let data = [];
      for (let i = 0; i < this.props.agreggate.length; i++) {
        data.push(this.props.agreggate[i].cnt);
      }
      return data;
    }

    /*getLabels(i) {
      let labels = [];
      for (let i = 0; i < this.props.agreggate.length; i++) {
        // eslint-disable-next-line no-underscore-dangle
        labels.push(this.props.agreggate[i]._id);
      }
      return labels;
    } */

    findArrayByCode(value) {
      for (let i = 0; i < okved.length; i++) {
        if (okved[i][1] == value._id) {
          return `${value._id} - ${okved[i][0]}: ${value.cnt}`;
        }
      }
      return null;
    }


    render() {
      console.log('render', this.props.agreggate);

      return (
        <div style={{ width: '100%', height: '100%' }}>
          <div className={styles.header}>
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>Аналитика</h1>
            </div><br />
            <div style={{ width: '100%', marginLeft: '80px', marginTop: '20px' }}>
              <div>
              <p className={styles.pText}>Распределение организаций по кодам ОКВЕД (10 наиболее популярных):</p>
              <div>
                {
                  this.props.agreggate.map((value, i) => (<p key={i}>{ this.findArrayByCode(value)}</p>))
                }
              </div>
            </div>
            </div>
          </div>
        </div>
      );
    }
}


function selectTopTen(data) {
  return data.slice(data.length - 10);
}


function mapStateToProps(state, ownProps) {
  console.log('mapstate', ownProps);
  return { agreggate: selectTopTen(state.agreggate) };
}


function mapDispatchToProps(dispatch) {
  let actions = {};
  actions.getAgreggate = getAgreggate;
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsView);

