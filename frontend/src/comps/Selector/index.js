import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Selector.styl';

export default class Selector extends Component {

  constructor(props) {
    super(props);

    this.reset = this.reset.bind(this);
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    selected: PropTypes.object,
    dataProvider: PropTypes.array.isRequired,
    dataFields: PropTypes.object, // маппинг к полям объектов dataProvider типа { value: '', title: '' }
    width: PropTypes.string,
    placeholder: PropTypes.string
  };

  static defaultProps = {
    dataFields: { value: 'value', title: 'title' },
    selected: null,
    width: '200px',
    placeholder: ''
  };

  getObjectValue(obj) {
    return (obj && obj[this.props.dataFields.value]) ? obj[this.props.dataFields.value] : '';
  }

  getObjectTitle(obj) {
    return (obj && obj[this.props.dataFields.title]) ? obj[this.props.dataFields.title] : '';
  }

  isSelected(item, index) {
    return (this.props.selected && this.props.selected.linearId) ?
      this.getObjectValue(item, index) === this.props.selected.linearId :
      false;
  }

  getObjectIndex(obj, index) {
    if (obj) {
      return obj.linearId ? obj.linearId : index;
    }
    return '';
  }

  reset() {
    this.select.selectedIndex = 0;
  }


  render() {
    return (
      <select ref={select => { this.select = select; }} onChange={this.props.onChange} style={{ width: this.props.width }} className={styles.select}>
        { (this.props.selected && this.props.placeholder) ? null : <option value="" selected disabled hidden>{this.props.placeholder}</option> }
        { this.props.dataProvider.map((item, index) => <option selected={this.isSelected(item, index)} key={this.getObjectIndex(item, index)} value={this.getObjectValue(item, index)}>{this.getObjectTitle(item)}</option>) }
      </select>
    );
  }

}
