/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';

import Img from 'components/Img';
import Footer from 'components/Footer';
import Banner from './assets/hypobox.png';
import A from 'components/A';
import Navigation from 'components/Navigation';

import styles from './styles.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

function App(props) {
  return (
    <MuiThemeProvider>
      <div className={styles.wrapper}>
        <Helmet
          titleTemplate="HypoBox - %s"
          defaultTitle="HypoBox"
          meta={[
            { name: 'description', content: 'Kalkulačka pre prepočet a porovnávania hypoték.' },
          ]}
        />
        <A className={styles.logoWrapper} href="/">
          <Img className={styles.logo} style={{ maxWidth: '100%', width: '300px' }} src={Banner} alt="HypoBox - Logo" />
        </A>
        <Navigation current={props.location ? props.location.pathname : null} />
        {React.Children.toArray(props.children)}
        <Footer />
      </div>
    </MuiThemeProvider>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
