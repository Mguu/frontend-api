import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { showModalWindow } from 'actions';

import './css/menu.css';



class TableView extends Component {

    constructor(props) {
        super(props);

        this.showModal1 = this.showModal1.bind(this);
        this.showModal2 = this.showModal2.bind(this);
        console.log("TableView");
    }

    showModal1() {
        console.log("modal1");
        this.props.showModalWindow({ message: "some message", isModal: true });
    }

    showModal2() {
        console.log("modal2");
        this.props.showModalWindow({ message: "some message", isModal: false });
    }

    render() {

        return (
            <div>
                <Link to="/render"><button className="btnBigRed btn-pos-1">button 1</button></Link>
                <button className="btnBigRed btn-pos-2" onClick={ this.showModal1 }>modalWindow1</button>
                <button className="btnBigRed btn-pos-3" onClick={ this.showModal2 }>modalWindow2</button>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    var actions = {};
    actions.showModalWindow = showModalWindow;
    return bindActionCreators(actions, dispatch);
}

export default connect(null, mapDispatchToProps)(TableView);