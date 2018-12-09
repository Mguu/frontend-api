import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './ProductsView.styl';

import Product from './Product';

class ProductsView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      products: this.generateProduct(60)
    };
  }

  generateProduct(number) {
    let i = 111111111;
    let data = [];
    for (let j = 0; j < number; j++) {
      data.push({ name: 'Какой то чудесный продукт', maker: `ООО "Ромашка - ${j}"`, category: 'Продукты', okpd2: i++ });
    }
    return data;
  }

    static propTypes = {
      match: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired
    };


    componentDidMount() {

    }


    render() {
      return (
        <div style={{ width: '100%', height: '100%' }}>
          <div className={styles.header}>
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>Продукты и услуги</h1>
            </div>
          </div>
          <div className={styles.productsGrid}>
            {
              this.state.products.map((value, i) => (<Product key={i} {...value} />))
            }
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
  // actions.getCatalog = getCatalog;
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsView);

