import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { http } from 'actions';

import styles from './FirmView.styl';


class FirmView extends Component {

  constructor(props) {
    super(props);

    this.state = { firm: { name: '', offSite: '' } };
  }


  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  componentDidMount() {
    console.log('ccc', this.props.match.params.inn);
    http.get(`/firm/${this.props.match.params.inn}`)
      .then(resp => {
        console.log('firm', resp.data);
        this.setState({ firm: resp.data });
      });
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <Link to="/" className={styles.backLink} />
            <h1 className={styles.title}>{this.state.firm.COMPANY_SHORT_NAME}</h1>
          </div>
        </div>
        <p className={styles.text}>
          <span className={styles.pTitle}>Место нахождения и почтовый адрес: </span> <br />
          <p className={styles.pText}>{this.state.firm.LEGAL_ADDRESS}</p>
          <span className={styles.pTitle}>Генеральный директор: </span> <br />
          <p className={styles.pText}>{this.state.firm.CEO}</p>
          <span className={styles.pTitle}>Официальный сайт: </span><br />
          <p className={styles.pText}>{ this.state.firm.SITE ? <a href={this.state.firm.SITE}>{this.state.firm.offSite}</a> : 'Не известен' }</p>
          <span className={styles.pTitle}>Код экономической деятельности: </span><br />
          <p className={styles.pText}>{`${this.state.firm.OKVED_CODE} - ${this.state.firm.OKVED_DESCR}`}</p>
        </p>
        <p className={styles.text}>{this.state.firm.text}</p>
      </div>
    );
  }
}


function mapStateToProps(state) {
  console.log('mapstate');
  return { catalog: state.catalog };
}


function mapDispatchToProps(dispatch) {
  let actions = {};
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FirmView);
