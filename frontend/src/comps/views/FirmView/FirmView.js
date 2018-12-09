import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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

  renderContacts() {
    const email = this.state.firm.EMAIL ? this.state.firm.EMAIL : 'Не известен';
    return (
      <p>
        <span className={styles.pContacts}>{ `email: ${email}` }</span><br />
        {
          this.state.firm.PHONES &&
          this.state.firm.PHONES.map((val, i) => {
            return (
              <span key={i} className={styles.pContacts}>{ `Телефон ${i + 1}: ${val}` }</span>
            );
          })
        }
      </p>
    );
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
          <span className={styles.pTitle}>Контакты: </span> <br />
          { this.renderContacts() }
          <span className={styles.pTitle}>Официальный сайт: </span><br />
          <p className={styles.pText}>{ this.state.firm.SITE ? <a href={this.state.firm.SITE}>{this.state.firm.offSite}</a> : 'Не известен' }</p>
          <span className={styles.pTitle}>Код экономической деятельности: </span><br />
          <p className={styles.pText}>{`${this.state.firm.OKVED_CODE} - ${this.state.firm.OKVED_DESCR}`}</p>
          <span className={styles.pTitle}>Реквизиты: </span><br />
          <p className={styles.pText}>
            <span>ИНН: {this.state.firm.INN}</span><br />
            <span>КПП: {this.state.firm.KPP}</span><br />
            <span>ОГРН: {this.state.firm.OGRN}</span><br />
          </p>
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
