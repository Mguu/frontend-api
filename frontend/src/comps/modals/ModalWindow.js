import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { showModalWindow } from 'actions';

import './modals.css';


class ModalWindow extends Component {


  constructor(props) {
    super(props);

    this.closeWindow = this.closeWindow.bind(this);

  }

  closeWindow() {
    this.props.showModalWindow(null);
  }

  render() {
    
    return (
      (this.props.show) ?
        <div className={this.props.isModal ? "modal" : "no-modal"}>
          <div className="modal-text">
            <p className="modal-p">{this.props.message}</p>
            <button className="modal-btn" onClick={ this.closeWindow }>OK</button>
          </div>
        </div> :
        null
    );
  }

}


ModalWindow.contextTypes = {
  assets: React.PropTypes.object,
  consts: React.PropTypes.object,
  sounds: React.PropTypes.object
};


function mapStateToProps(state) {
  
  return {
    message: state.modalWindow && state.modalWindow.message,
    isModal: state.modalWindow && state.modalWindow.isModal,
    show: Boolean(state.modalWindow)
  }
}

function mapDispatchToProps(dispatch) {
    var actions = {};
    actions.showModalWindow = showModalWindow;
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow);
