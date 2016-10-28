import React from 'react';
import { Link } from 'react-router';

import styles from './styles.scss';


const Navigation = ({ current }) => (
  <ul className={styles.navigation}>
    <li><Link className={current ? styles.selected : ''} to={'/'}>Priebeh hypotéky</Link></li>
    <li><Link className={current ? styles.selected : ''} to={'/aku-hypoteku-dostanem'}>Koľko dostanem</Link></li>
  </ul>
);

Navigation.propTypes = {
  current: React.PropTypes.string,
};

export default Navigation;
