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
    http.get(`/catalog/${this.props.match.params.inn}`)
      .then(resp => {
        this.setState({ firm: resp.data });
      });
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <Link to="/" className={styles.backLink} />
            <h1 className={styles.title}>{this.state.firm.name}</h1>
          </div>
        </div>
        <p className={styles.text}>
          <span className={styles.pTitle}>Место нахождения и почтовый адрес: </span> <br />
          <p className={styles.pText}>{this.state.firm.address}</p>
          <span className={styles.pTitle}>Официальный сайт: </span><br />
          <p className={styles.pText}><a href={this.state.firm.offSite}>{this.state.firm.offSite}</a></p>
          <span className={styles.pTitle}>Описание продукции: </span><br />
          <p className={styles.pText}>Какое то описание чудесной и инновационной продукции.</p>
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
