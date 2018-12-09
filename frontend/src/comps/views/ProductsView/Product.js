/* eslint-disable react/react-in-jsx-scope */
import styles from './ProductsView.styl';
import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default function product ({
  foto = 'https://via.placeholder.com/140x100',
  name = 'Инновационный продукт', maker = 'Производитель',
  category = 'Электроника', okpd2 = ''
}) {
  return (
    <div className={styles.product}>
      <img src={foto} alt="" />
      <p>{name}</p>
      <p>{category}</p>
      <p>{maker}</p>
      <p>{okpd2}</p>
    </div>
  );
}
