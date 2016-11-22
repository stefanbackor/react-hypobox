import React from 'react';
import { Link } from 'react-router';

import styles from './styles.scss';


const Navigation = ({ current }) => {
  const items = {
    '/': 'Priebeh hypotéky',
    '/aku-hypoteku-dostanem': 'Koľko dostanem',
  };
  return (
    <ul className={styles.navigation}>
      {Object.keys(items).map(
        (path) => <li key={path}><Link className={current == path ? styles.selected : ''} to={path}>{items[path]}</Link></li>
      )}
    </ul>
  );
};

Navigation.propTypes = {
  current: React.PropTypes.string,
};

export default Navigation;
